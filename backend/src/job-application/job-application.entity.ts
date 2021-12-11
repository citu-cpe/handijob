import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Freelancer } from '../freelancer/freelancer.entity';
import { JobOpening } from '../job-opening/job-opening.entity';
import { JobApplicationDTO } from './dto/job-application.dto';
import { JobApplicationStatus } from './types/job-application-status.enum';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.jobApplications)
  public freelancer: Freelancer;

  @ManyToOne(() => JobOpening, (jobOpening) => jobOpening.jobApplications)
  public jobOpening: JobOpening;

  @Column({
    type: 'enum',
    enum: JobApplicationStatus,
    default: JobApplicationStatus.UNDER_REVIEW,
  })
  public status: JobApplicationStatus;

  public toDTO(): JobApplicationDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      freelancer: this.freelancer && this.freelancer.toDTO(),
      jobOpening: this.jobOpening && this.jobOpening.toDTO(),
      status: this.status,
    };
  }
}
