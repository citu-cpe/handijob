import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Message } from './message.entity';
import { RoomDTO } from './dto/room.dto';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: true })
  public name?: string;

  @OneToMany(() => Message, (message) => message.room)
  public messages: Message[];

  @ManyToMany(() => User)
  @JoinTable()
  public participants: User[];

  public toDTO(user: User): RoomDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name
        ? this.name
        : this.participants
            .filter((p) => p.id !== user.id)
            .map((p) => p.username)
            .join(','),
      messages: this.messages
        ? this.messages.map((message) => message.toDTO(user))
        : [],
      participants: this.participants.map((participant) => participant.toDTO()),
      hasUnseenMessages: this.messages
        ? this.messages
            .filter((message) => message.sender.id !== user.id)
            .some((message) => !message.seen)
        : false,
    };
  }
}
