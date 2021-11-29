import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateJobApplicationDTO } from '../job-application/dto/create-job-application.dto';
import { JobOpeningService } from '../job-opening/job-opening.service';

// tslint:disable:no-console
@WebSocketGateway({ cors: true })
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  constructor(private readonly jobOpeningService: JobOpeningService) {}

  public handleConnection() {
    console.log('Gateway Connection');
  }

  public handleDisconnect() {
    console.log('Gateway Disconnect');
  }

  public afterInit() {
    console.log('Gateway Init');
  }

  @SubscribeMessage('applyJobOpening')
  public async handleEvent(
    @MessageBody() body: CreateJobApplicationDTO,
    @ConnectedSocket() socket: Socket
  ) {
    const { jobOpeningId } = body;

    const jobOpening = await this.jobOpeningService.findById(jobOpeningId);

    const userId = jobOpening.employer.user.id;
    const clientUserId = socket.handshake.headers.userid;

    this.server.emit('notifications', { clientUserId, userId });
  }
}
