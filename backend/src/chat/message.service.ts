import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { SendMessageDTO } from './dto/send-message.dto';
import { MessageRepository } from './message.repository';
import { Room } from './room.entity';
import { RoomRepository } from './room.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly roomRepository: RoomRepository,
    private readonly userService: UserService
  ) {}

  public async sendMessage(userId: string, sendMessageDTO: SendMessageDTO) {
    const { roomId, content } = sendMessageDTO;

    let room: Room;

    try {
      room = await this.roomRepository.findOneOrFail(roomId);
    } catch (e) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    let user: User;

    try {
      user = await this.userService.findById(userId);
    } catch (e) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const message = this.messageRepository.create({
      content,
      room,
      sender: user,
    });

    return this.messageRepository.save(message);
  }

  public async markMessageAsSeen(messageIds: string[]) {
    await this.messageRepository.update(messageIds, { seen: true });
  }
}
