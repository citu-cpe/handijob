import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryCreate1636329770201 implements MigrationInterface {
  name = 'CategoryCreate1636329770201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "category"
        ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
         "created_at" TIMESTAMP NOT NULL DEFAULT now(),
         "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
         "name" character varying NOT NULL,
         CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
