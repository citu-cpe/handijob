import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountTypeEntity } from '../account-type/types/account-type-entity.interface';
import { JobOpening } from '../job-opening/job-opening.entity';
import { User } from '../user/user.entity';
import { EmployerDTO } from './dto/employer.dto';

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

  @Column({ nullable: true })
  public companyName?: string;

  @Column({ nullable: true })
  public companyDescription?: string;

  @Column({ nullable: true })
  public companyLink?: string;

  public toDTO(): EmployerDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      companyName: this.companyName,
      companyDescription: this.companyDescription,
      companyLink: this.companyLink,
    };
  }
}
