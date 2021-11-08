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
import { JobOffer } from '../job-offer/job-offer.entity';
import { User } from '../user/user.entity';

@Entity()
export class Employer implements AccountTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @OneToMany(() => JobOffer, (jobOffer) => jobOffer.employer)
  public jobOffers: JobOffer[];
}
