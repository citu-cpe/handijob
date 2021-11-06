import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountType } from '../account-type/account-type.entity';
import { AccountTypes } from '../account-type/types/account-types.enum';
import { UserDTO } from './dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Column({ unique: true, name: 'email' })
  public email: string;

  @Column({ unique: true, name: 'username' })
  public username: string;

  @Column({ name: 'password' })
  @Exclude()
  public password: string;

  @Column({ nullable: true, name: 'current_hashed_refresh_token' })
  @Exclude()
  public currentHashedRefreshToken?: string;

  @ManyToMany(() => AccountType, { eager: true })
  @JoinTable()
  public accountTypes: AccountType[];

  public toDTO(): UserDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      username: this.username,
      email: this.email,
      accountTypes: this.accountTypes.map(
        (accountType) => AccountTypes[accountType.type]
      ),
    };
  }
}
