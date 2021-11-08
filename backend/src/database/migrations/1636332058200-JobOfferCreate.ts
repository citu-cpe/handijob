import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobOfferCreate1636332058200 implements MigrationInterface {
  name = 'JobOfferCreate1636332058200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_offer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "image_url" character varying NOT NULL, "employer_id" uuid, CONSTRAINT "REL_a576e8da4e2a1280a4c5b8fb73" UNIQUE ("employer_id"), CONSTRAINT "PK_5286026037ab5fb5acfcb7e1829" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "job_offer_categories_category" ("jobOfferId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_bb601de0c2500cf21a9a93e7708" PRIMARY KEY ("jobOfferId", "categoryId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fcdcfa8c33b4128d0d1e862309" ON "job_offer_categories_category" ("jobOfferId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2fc2c8dbb1fc3e239a71b30a47" ON "job_offer_categories_category" ("categoryId") `
    );
    await queryRunner.query(
      `ALTER TABLE "job_offer" ADD CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_offer_categories_category" ADD CONSTRAINT "FK_fcdcfa8c33b4128d0d1e8623097" FOREIGN KEY ("jobOfferId") REFERENCES "job_offer"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "job_offer_categories_category" ADD CONSTRAINT "FK_2fc2c8dbb1fc3e239a71b30a47a" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_offer_categories_category" DROP CONSTRAINT "FK_2fc2c8dbb1fc3e239a71b30a47a"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_offer_categories_category" DROP CONSTRAINT "FK_fcdcfa8c33b4128d0d1e8623097"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_offer" DROP CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736"`
    );
    await queryRunner.query(`DROP INDEX "IDX_2fc2c8dbb1fc3e239a71b30a47"`);
    await queryRunner.query(`DROP INDEX "IDX_fcdcfa8c33b4128d0d1e862309"`);
    await queryRunner.query(`DROP TABLE "job_offer_categories_category"`);
    await queryRunner.query(`DROP TABLE "job_offer"`);
  }
}
