import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryDTO } from './dto/category.dto';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @Column({ name: 'name' })
  public name: string;

  public toDTO(): CategoryDTO {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      name: this.name,
    };
  }
}
