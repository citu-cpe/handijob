import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditProfile1638839926504 implements MigrationInterface {
  name = 'EditProfile1638839926504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "work_experience" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "years_of_experience" character varying NOT NULL, "job_title" character varying NOT NULL, "job_description" character varying NOT NULL, "freelancer_id" uuid, CONSTRAINT "PK_d4bef63ad6da7ec327515c121bd" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "bio" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "image_url" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "cloudinary_public_id" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" ADD "company_name" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" ADD "company_description" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" ADD "company_link" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "work_experience" ADD CONSTRAINT "FK_cf6369310105cf22e061250b449" FOREIGN KEY ("freelancer_id") REFERENCES "freelancer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "work_experience" DROP CONSTRAINT "FK_cf6369310105cf22e061250b449"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" DROP COLUMN "company_link"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" DROP COLUMN "company_description"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" DROP COLUMN "company_name"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "cloudinary_public_id"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "image_url"`
    );
    await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "bio"`);
    await queryRunner.query(`DROP TABLE "work_experience"`);
  }
}
