import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { MessageDTO } from './dto/message.dto';
import { Room } from './room.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column()
  public content: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  public sender: User;

  @Column({ default: false })
  public seen: boolean;

  @ManyToOne(() => Room, (room) => room.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public room: Room;

  public toDTO(user: User): MessageDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      content: this.content,
      sender: this.sender.toDTO(),
      seen: this.seen,
      room: this.room ? this.room.toDTO(user) : undefined,
      self: this.sender.id === user.id,
    };
  }
}
