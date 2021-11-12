import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountTypeEntity } from '../account-type/types/account-type-entity.interface';
import { JobOpening } from '../job-offer/job-opening.entity';
import { User } from '../user/user.entity';

@Entity()
export class Employer implements AccountTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: User;

  @OneToMany(() => JobOpening, (jobOpening) => jobOpening.employer)
  public jobOpenings: JobOpening[];
}
