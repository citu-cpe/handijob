import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Categories } from '../category/types/categories.enum';
import { Employer } from '../employer/employer.entity';
import { JobApplication } from '../job-application/job-application.entity';
import { spaceCaseToSnakeCase } from '../util/space-case-to-snake-case';
import { JobOpeningDTO } from './dto/job-opening.dto';

@Entity()
export class JobOpening {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => Employer, (employer) => employer.jobOpenings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public employer: Employer;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  public categories: Category[];

  @OneToMany(
    () => JobApplication,
    (jobApplication) => jobApplication.jobOpening
  )
  public jobApplications: JobApplication[];

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public imageUrl?: string;

  @Column({ nullable: true })
  public cloudinaryPublicId?: string;

  public toDTO(): JobOpeningDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      employerId: this.employer.id,
      categories: this.categories.map(
        (category) => Categories[spaceCaseToSnakeCase(category.name)]
      ),
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      cloudinaryPublicId: this.cloudinaryPublicId,
    };
  }
}
