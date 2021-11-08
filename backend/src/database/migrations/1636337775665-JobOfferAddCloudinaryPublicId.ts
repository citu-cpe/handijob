import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobOfferAddCloudinaryPublicId1636337775665
  implements MigrationInterface
{
  name = 'JobOfferAddCloudinaryPublicId1636337775665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" ADD "cloudinary_public_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" ALTER COLUMN "image_url" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" ALTER COLUMN "image_url" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" DROP COLUMN "cloudinary_public_id"`
    );
  }
}
