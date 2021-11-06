import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployerCreate1636193377191 implements MigrationInterface {
  name = 'EmployerCreate1636193377191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_6b1262606e8e48d624fa5557b3" UNIQUE ("user_id"), CONSTRAINT "PK_74029e6b1f17a4c7c66d43cfd34" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "employer" ADD CONSTRAINT "FK_6b1262606e8e48d624fa5557b3e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employer" DROP CONSTRAINT "FK_6b1262606e8e48d624fa5557b3e"`
    );
    await queryRunner.query(`DROP TABLE "employer"`);
  }
}
