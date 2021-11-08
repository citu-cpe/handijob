import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { Categories } from './types/categories.enum';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  public async findByCategories(categories: Categories[]): Promise<Category[]> {
    return this.find({
      where: categories.map((category) => ({
        name: category,
      })),
    });
  }
}
