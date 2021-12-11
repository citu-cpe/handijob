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
import { JobApplication } from '../job-application/job-application.entity';
import { User } from '../user/user.entity';
import { FreelancerDTO } from './dto/freelancer.dto';
import { WorkExperience } from './work-experience.entity';

@Entity()
export class Freelancer implements AccountTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  public user: User;

  @OneToMany(
    () => WorkExperience,
    (workExperience) => workExperience.freelancer
  )
  public workExperiences: WorkExperience[];

  @OneToMany(
    () => JobApplication,
    (jobApplication) => jobApplication.freelancer
  )
  public jobApplications: JobApplication[];

  public toDTO(): FreelancerDTO {
    return {
      id: this.id,
      user: this.user && this.user.toDTO(),
      workExperiences: this.workExperiences
        ? this.workExperiences.map((w) => w.toDTO())
        : [],
    };
  }
}
