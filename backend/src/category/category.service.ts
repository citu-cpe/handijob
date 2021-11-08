import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './dto/category.dto';
import { Categories } from './types/categories.enum';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  public async findAll(): Promise<CategoryDTO[]> {
    const categories = await this.categoryRepository.find();

    return categories.map((category) => category.toDTO());
  }

  public findByCategories(categories: Categories[]): Promise<Category[]> {
    return this.categoryRepository.findByCategories(categories);
  }
}
