import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateJobApplicationDTO } from '../job-application/dto/create-job-application.dto';
import { JobOpeningService } from '../job-opening/job-opening.service';
import { WebSocketEvents } from '../web-sockets/enum/web-socket-events.enum';

@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly jobOpeningService: JobOpeningService) {}

  @SubscribeMessage(WebSocketEvents.APPLY_JOB_OPENING)
  public async handleEvent(
    @MessageBody() body: CreateJobApplicationDTO,
    @ConnectedSocket() socket: Socket
  ) {
    const { jobOpeningId } = body;

    const jobOpening = await this.jobOpeningService.findById(jobOpeningId);

    const userId = jobOpening.employer.user.id;
    const clientUserId = socket.handshake.headers.userid;

    this.server
      .to(userId)
      .emit(WebSocketEvents.NOTIFICATIONS, { clientUserId, userId });
  }
}
