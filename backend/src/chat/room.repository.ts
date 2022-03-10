import { EntityRepository, Repository } from 'typeorm';
import { Room } from './room.entity';

@EntityRepository(Room)
export class RoomRepository extends Repository<Room> {
  public findByUserId(userId: string) {
    this.find({ relations: ['participants', 'messages', 'messages.sender'] });
  }
}
