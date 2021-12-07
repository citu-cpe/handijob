import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkExperienceDTO } from './dto/work-experience.dto';
import { Freelancer } from './freelancer.entity';

@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => Freelancer, (freelancer) => freelancer.workExperiences)
  public freelancer: Freelancer;

  @Column()
  public yearsOfExperience: string;

  @Column()
  public jobTitle: string;

  @Column()
  public jobDescription: string;

  public toDTO(): WorkExperienceDTO {
    return {
      id: this.id,
      yearsOfExperience: this.yearsOfExperience,
      jobTitle: this.jobTitle,
      jobDescription: this.jobDescription,
    };
  }
}
