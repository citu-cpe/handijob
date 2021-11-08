import { MigrationInterface, QueryRunner } from 'typeorm';

export class JobOfferManyToOne1636351195002 implements MigrationInterface {
  name = 'JobOfferManyToOne1636351195002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" DROP CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" DROP CONSTRAINT "REL_a576e8da4e2a1280a4c5b8fb73"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" ADD CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" DROP CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" ADD CONSTRAINT "REL_a576e8da4e2a1280a4c5b8fb73" UNIQUE ("employer_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."job_offer" ADD CONSTRAINT "FK_a576e8da4e2a1280a4c5b8fb736" FOREIGN KEY ("employer_id") REFERENCES "employer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
