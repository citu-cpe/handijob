import { Exclude } from 'class-transformer';
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
import { AccountType } from '../account-type/account-type.entity';
import { AccountTypes } from '../account-type/types/account-types.enum';
import { UserDTO } from './dto/user.dto';
import { Notification } from '../notifications/notification.entity';
import { Room } from '../chat/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ unique: true })
  public email: string;

  @Column({ unique: true })
  public username: string;

  @Column()
  @Exclude()
  public password: string;

  @Column({ nullable: true })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @ManyToMany(() => AccountType, { eager: true })
  @JoinTable()
  public accountTypes: AccountType[];

  @ManyToMany(() => Room)
  public rooms: Room[];

  @OneToMany(() => Notification, (notification) => notification.user)
  public notifications: Notification[];

  public toDTO(): UserDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      username: this.username,
      email: this.email,
      accountTypes:
        this.accountTypes &&
        this.accountTypes.map((accountType) => AccountTypes[accountType.type]),
    };
  }
}
