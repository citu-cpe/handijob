import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobOpeningAddArchived1638174292859 implements MigrationInterface {
  name = 'JobOpeningAddArchived1638174292859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening" ADD "archived" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening" DROP COLUMN "archived"`
    );
  }
}
