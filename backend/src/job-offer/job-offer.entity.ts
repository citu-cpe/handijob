import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Categories } from '../category/types/categories.enum';
import { Employer } from '../employer/employer.entity';
import { spaceCaseToSnakeCase } from '../util/space-case-to-snake-case';
import { JobOfferDTO } from './dto/job-offer.dto';

@Entity()
export class JobOffer {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @ManyToOne(() => Employer, (employer) => employer.jobOffers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employer_id' })
  public employer: Employer;

  @ManyToMany(() => Category, { eager: true })
  @JoinTable()
  public categories: Category[];

  @Column({ name: 'title' })
  public title: string;

  @Column({ name: 'description' })
  public description: string;

  @Column({ name: 'image_url', nullable: true })
  public imageUrl?: string;

  @Column({ name: 'cloudinary_public_id', nullable: true })
  public cloudinaryPublicId?: string;

  public toDTO(): JobOfferDTO {
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
