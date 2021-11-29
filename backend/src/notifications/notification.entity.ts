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
import { NotificationDTO } from './dto/notification.dto';
import * as moment from 'moment';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user: User;

  @Column()
  public content: string;

  @Column({ default: false })
  public seen: boolean;

  public toDTO(): NotificationDTO {
    return {
      id: this.id,
      userId: this.user.id,
      content: this.content,
      seen: this.seen,
      timeAgo: moment(this.createdAt).fromNow(),
    };
  }
}
