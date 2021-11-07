import { MigrationInterface, QueryRunner } from 'typeorm';

export class FreelancerCreate1636192616698 implements MigrationInterface {
  name = 'FreelancerCreate1636192616698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "freelancer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_d45d99386b1b9de211dd6db5ea" UNIQUE ("user_id"), CONSTRAINT "PK_7e7807b0f4224ee2ab8a11f8e5d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "freelancer" ADD CONSTRAINT "FK_d45d99386b1b9de211dd6db5ea1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "freelancer" DROP CONSTRAINT "FK_d45d99386b1b9de211dd6db5ea1"`
    );
    await queryRunner.query(`DROP TABLE "freelancer"`);
  }
}
