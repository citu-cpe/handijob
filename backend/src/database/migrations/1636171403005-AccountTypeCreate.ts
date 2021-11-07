import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountTypeCreate1636171403005 implements MigrationInterface {
  name = 'AccountTypeCreate1636171403005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying NOT NULL, CONSTRAINT "UQ_6c1addab805d977e06a7b3853c9" UNIQUE ("type"), CONSTRAINT "PK_215ed371eba21a3ec30c2cfa1de" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_account_types_account_type" ("userId" uuid NOT NULL, "accountTypeId" uuid NOT NULL, CONSTRAINT "PK_38b8a6fc8d848d5c59d100b2006" PRIMARY KEY ("userId", "accountTypeId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25d3093a9f7bf959f550eb1761" ON "user_account_types_account_type" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fd4f96f30e138f522e74697059" ON "user_account_types_account_type" ("accountTypeId") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_account_types_account_type" ADD CONSTRAINT "FK_25d3093a9f7bf959f550eb1761f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "user_account_types_account_type" ADD CONSTRAINT "FK_fd4f96f30e138f522e746970597" FOREIGN KEY ("accountTypeId") REFERENCES "account_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_account_types_account_type" DROP CONSTRAINT "FK_fd4f96f30e138f522e746970597"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_account_types_account_type" DROP CONSTRAINT "FK_25d3093a9f7bf959f550eb1761f"`
    );
    await queryRunner.query(`DROP INDEX "IDX_fd4f96f30e138f522e74697059"`);
    await queryRunner.query(`DROP INDEX "IDX_25d3093a9f7bf959f550eb1761"`);
    await queryRunner.query(`DROP TABLE "user_account_types_account_type"`);
    await queryRunner.query(`DROP TABLE "account_type"`);
  }
}
