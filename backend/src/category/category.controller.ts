import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';

@Controller(CategoryController.CATEGORY_API_ROUTE)
export class CategoryController {
  public static readonly CATEGORY_API_ROUTE = 'category';

  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  public getAllCategories(): Promise<CategoryDTO[]> {
    return this.categoryService.findAll();
  }
}
