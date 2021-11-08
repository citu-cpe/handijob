import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from '../../category/category.entity';

export class CategoryAddInitialCategories1636329856346
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Category, [
      { name: 'IT' },
      { name: 'Art' },
      { name: 'Construction Worker' },
      { name: 'Foreman' },
      { name: 'Plumber' },
      { name: 'Carpenter' },
      { name: 'Electrician' },
      { name: 'Welder' },
      { name: 'Aircon Repair' },
      { name: 'Gadget Repair' },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Category, { name: 'IT' });
    await queryRunner.manager.delete(Category, { name: 'Art' });
    await queryRunner.manager.delete(Category, { name: 'Construction Worker' });
    await queryRunner.manager.delete(Category, { name: 'Foreman' });
    await queryRunner.manager.delete(Category, { name: 'Plumber' });
    await queryRunner.manager.delete(Category, { name: 'Carpenter' });
    await queryRunner.manager.delete(Category, { name: 'Electrician' });
    await queryRunner.manager.delete(Category, { name: 'Aircon Repair' });
    await queryRunner.manager.delete(Category, { name: 'Gadget Repair' });
  }
}
