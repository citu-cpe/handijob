import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAccountTypeColumnNames1636773376187
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE user_account_types_account_type
        RENAME COLUMN "userId" TO user_id;

        ALTER TABLE user_account_types_account_type
        RENAME COLUMN "accountTypeId" TO account_type_id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE user_account_types_account_type
        RENAME COLUMN user_id TO "userId";

        ALTER TABLE user_account_types_account_type
        RENAME COLUMN account_type_id TO "accountTypeId";
    `);
  }
}
