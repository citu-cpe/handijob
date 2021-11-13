import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobOpeningCreate1636802544033 implements MigrationInterface {
  name = 'JobOpeningCreate1636802544033';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening" DROP CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" DROP CONSTRAINT "FK_fd4f96f30e138f522e746970597"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" DROP CONSTRAINT "FK_25d3093a9f7bf959f550eb1761f"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" DROP CONSTRAINT "FK_2fc2c8dbb1fc3e239a71b30a47a"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" DROP CONSTRAINT "FK_fcdcfa8c33b4128d0d1e8623097"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fd4f96f30e138f522e74697059"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_25d3093a9f7bf959f550eb1761"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2fc2c8dbb1fc3e239a71b30a47"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fcdcfa8c33b4128d0d1e862309"`
    );
    await queryRunner.query(
      `CREATE TYPE "job_application_status_enum" AS ENUM('ACCEPTED', 'REJECTED', 'UNDER REVIEW')`
    );
    await queryRunner.query(
      `CREATE TABLE "job_application" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "job_application_status_enum" NOT NULL DEFAULT 'UNDER REVIEW', "freelancer_id" uuid, "job_opening_id" uuid, CONSTRAINT "PK_c0b8f6b6341802967369b5d70f5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_17f8608c5796e9523b77fcdff0" ON "public"."user_account_types_account_type" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ce676553365333bfb71ebb5c6" ON "public"."user_account_types_account_type" ("account_type_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1fd72f94cf6b058d856dcf2095" ON "public"."job_opening_categories_category" ("job_opening_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d844ed89629e13c017a4bbc8df" ON "public"."job_opening_categories_category" ("category_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD CONSTRAINT "FK_2ff54202116ec3421242bf9374b" FOREIGN KEY ("freelancer_id") REFERENCES "freelancer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" ADD CONSTRAINT "FK_25bb446735309aaaff6cfa4aca1" FOREIGN KEY ("job_opening_id") REFERENCES "job_opening"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening" ADD CONSTRAINT "FK_ac110daf1ff8b24cf4a9c345428" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" ADD CONSTRAINT "FK_17f8608c5796e9523b77fcdff02" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" ADD CONSTRAINT "FK_8ce676553365333bfb71ebb5c65" FOREIGN KEY ("account_type_id") REFERENCES "account_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" ADD CONSTRAINT "FK_1fd72f94cf6b058d856dcf2095b" FOREIGN KEY ("job_opening_id") REFERENCES "job_opening"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" ADD CONSTRAINT "FK_d844ed89629e13c017a4bbc8dfe" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" DROP CONSTRAINT "FK_d844ed89629e13c017a4bbc8dfe"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" DROP CONSTRAINT "FK_1fd72f94cf6b058d856dcf2095b"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" DROP CONSTRAINT "FK_8ce676553365333bfb71ebb5c65"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" DROP CONSTRAINT "FK_17f8608c5796e9523b77fcdff02"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening" DROP CONSTRAINT "FK_ac110daf1ff8b24cf4a9c345428"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP CONSTRAINT "FK_25bb446735309aaaff6cfa4aca1"`
    );
    await queryRunner.query(
      `ALTER TABLE "job_application" DROP CONSTRAINT "FK_2ff54202116ec3421242bf9374b"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d844ed89629e13c017a4bbc8df"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1fd72f94cf6b058d856dcf2095"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8ce676553365333bfb71ebb5c6"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_17f8608c5796e9523b77fcdff0"`
    );
    await queryRunner.query(`DROP TABLE "job_application"`);
    await queryRunner.query(`DROP TYPE "job_application_status_enum"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_fcdcfa8c33b4128d0d1e862309" ON "public"."job_opening_categories_category" ("job_opening_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2fc2c8dbb1fc3e239a71b30a47" ON "public"."job_opening_categories_category" ("category_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25d3093a9f7bf959f550eb1761" ON "public"."user_account_types_account_type" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd4f96f30e138f522e74697059" ON "public"."user_account_types_account_type" ("account_type_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" ADD CONSTRAINT "FK_fcdcfa8c33b4128d0d1e8623097" FOREIGN KEY ("job_opening_id") REFERENCES "job_opening"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening_categories_category" ADD CONSTRAINT "FK_2fc2c8dbb1fc3e239a71b30a47a" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" ADD CONSTRAINT "FK_25d3093a9f7bf959f550eb1761f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_account_types_account_type" ADD CONSTRAINT "FK_fd4f96f30e138f522e746970597" FOREIGN KEY ("account_type_id") REFERENCES "account_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_opening" ADD CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
