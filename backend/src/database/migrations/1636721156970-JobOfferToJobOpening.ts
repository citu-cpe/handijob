import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobOfferToJobOpening1636721156970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE job_offer
        RENAME TO job_opening;

        ALTER TABLE job_offer_categories_category
        RENAME TO job_opening_categories_category;

        ALTER TABLE job_opening_categories_category
        RENAME COLUMN "jobOfferId" TO job_opening_id;

        ALTER TABLE job_opening_categories_category
        RENAME COLUMN "categoryId" TO category_id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE job_opening_categories_category
        RENAME COLUMN category_id TO "categoryId";

        ALTER TABLE job_opening_categories_category
        RENAME COLUMN job_opening_id TO "jobOfferId";

        ALTER TABLE job_opening_categories_category
        RENAME TO job_offer_categories_category;

        ALTER TABLE job_opening
        RENAME TO job_offer
    `);
  }
}
