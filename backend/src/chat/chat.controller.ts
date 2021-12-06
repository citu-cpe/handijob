import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { SendMessageDTO } from './dto/send-message.dto';
import { MessageService } from './message.service';
import { RoomService } from './room.service';

@Controller(ChatController.CHAT_API_PATH)
export class ChatController {
  public static readonly CHAT_API_PATH = '/chat';
  public static readonly ROOM_API_PATH = '/rooms';
  public static readonly MESSAGES_API_PATH = '/messages';

  constructor(
    private readonly messageService: MessageService,
    private readonly roomService: RoomService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get(ChatController.ROOM_API_PATH)
  public getRoomsOfUser(@Req() { user }: RequestWithUser) {
    return this.roomService.getRoomsOfUser(user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post(ChatController.ROOM_API_PATH)
  public joinRoom(
    @Req() { user }: RequestWithUser,
    @Body() body: { otherUserId: string }
  ) {
    return this.roomService.joinRoom(user.id, body.otherUserId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post(ChatController.MESSAGES_API_PATH)
  public sendMessage(
    @Req() { user }: RequestWithUser,
    @Body() sendMessageDTO: SendMessageDTO
  ) {
    return this.messageService.sendMessage(user.id, sendMessageDTO);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(ChatController.MESSAGES_API_PATH)
  public markMessageAsSeen(@Body() messageIds: string[]) {
    return this.messageService.markMessageAsSeen(messageIds);
  }
}
