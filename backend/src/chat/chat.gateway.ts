import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocketEvents } from '../web-sockets/enum/web-socket-events.enum';
import { SendMessageDTO } from './dto/send-message.dto';
import { MessageService } from './message.service';
import { RoomService } from './room.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService
  ) {}

  public async handleConnection(socket: Socket) {
    const userId = socket.handshake.headers.userid as string;

    if (!!userId && userId !== 'undefined') {
      const rooms = await this.roomService.getRoomsOfUser(userId);

      for (const room of rooms) {
        socket.join(room.id);
      }
    }
  }

  public async handleDisconnect(socket: Socket) {
    const userId = socket.handshake.headers.userid as string;

    if (!!userId && userId !== 'undefined') {
      const rooms = await this.roomService.getRoomsOfUser(userId);

      for (const room of rooms) {
        socket.leave(room.id);
      }
    }
  }

  @SubscribeMessage(WebSocketEvents.PRIVATE_MESSAGE)
  public async handlePrivateMessage(
    @MessageBody() sendMessageDTO: SendMessageDTO,
    @ConnectedSocket() socket: Socket
  ) {
    const userId = socket.handshake.headers.userid as string;

    if (!!userId && userId !== 'undefined') {
      await this.messageService.sendMessage(userId, sendMessageDTO);

      this.server
        .to(sendMessageDTO.roomId)
        .emit(WebSocketEvents.PRIVATE_MESSAGE, sendMessageDTO);
    }
  }

  @SubscribeMessage(WebSocketEvents.MESSAGES_SEEN)
  public async handleMessagesSeen(
    @MessageBody() messageIds: string[],
    @ConnectedSocket() socket: Socket
  ) {
    await this.messageService.markMessageAsSeen(messageIds);

    const userId = socket.handshake.headers.userid as string;

    if (!!userId && userId !== 'undefined') {
      this.server.to(userId).emit(WebSocketEvents.MESSAGES_SEEN);
    }
  }

  @SubscribeMessage(WebSocketEvents.JOIN_ROOM)
  public async handleJoinRoom(
    @MessageBody() otherUserId: string,
    @ConnectedSocket() socket: Socket
  ) {
    const userId = socket.handshake.headers.userid as string;

    if (!!userId && userId !== 'undefined') {
      const room = await this.roomService.joinRoom(userId, otherUserId);

      socket.join(room.id);

      this.server.to(userId).emit(WebSocketEvents.JOIN_ROOM, room);
    }
  }
}
