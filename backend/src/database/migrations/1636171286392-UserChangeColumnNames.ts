import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserChangeColumnNames1636171286392 implements MigrationInterface {
  name = 'UserChangeColumnNames1636171286392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "public"."user" RENAME COLUMN "currentHashedRefreshToken" TO "current_hashed_refresh_token";
        ALTER TABLE "public"."user" RENAME COLUMN "updatedAt" TO "updated_at";
        ALTER TABLE "public"."user" RENAME COLUMN "createdAt" TO created_at;
      `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        ALTER TABLE "public"."user" RENAME COLUMN "current_hashed_refresh_token" TO "currentHashedRefreshToken";
        ALTER TABLE "public"."user" RENAME COLUMN "updated_at" TO "updatedAt";
        ALTER TABLE "public"."user" RENAME COLUMN "created_at" TO "createdAt";
      `
    );
  }
}
