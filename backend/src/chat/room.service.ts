import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RoomDTO } from './dto/room.dto';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly userService: UserService
  ) {}

  public async getRoomsOfUser(userId: string): Promise<RoomDTO[]> {
    const user = await this.userService.findById(userId);

    // TODO: find by user
    const rooms = await this.roomRepository.find({
      relations: ['participants', 'messages', 'messages.sender'],
    });

    const userRooms = rooms.filter((room) =>
      room.participants.some((participant) => participant.id === user.id)
    );

    for (const room of userRooms) {
      room.messages.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
    }

    // sort by latest message
    userRooms.sort((a, b) => {
      if (a.messages.length === 0) {
        return 1;
      }
      if (b.messages.length === 0) {
        return -1;
      }

      return (
        b.messages[b.messages.length - 1].createdAt.getTime() -
        a.messages[a.messages.length - 1].createdAt.getTime()
      );
    });

    return userRooms.map((room) => room.toDTO(user));
  }

  public async joinRoom(userId: string, otherUserId: string) {
    const user = await this.userService.findById(userId);
    const otherUser = await this.userService.findById(otherUserId);

    const rooms = await this.getRoomsOfUser(user.id);

    const existingRoom = rooms.find((r) =>
      r.participants.some((participant) => participant.id === otherUser.id)
    );

    if (existingRoom) {
      return existingRoom;
    }

    const newRoom = this.roomRepository.create({
      participants: [user, otherUser],
    });

    const room = await this.roomRepository.save(newRoom);

    return room.toDTO(user);
  }
}
