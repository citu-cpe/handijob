import { AccountType } from '../../account-type/account-type.entity';
import { AccountTypes } from '../../account-type/types/account-types.enum';
import { Category } from '../../category/category.entity';
import { Categories } from '../../category/types/categories.enum';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AccountTypeAndCategoryEnums1651813937949
  implements MigrationInterface
{
  name = 'AccountTypeAndCategoryEnums1651813937949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" DROP CONSTRAINT "UQ_6c1addab805d977e06a7b3853c9"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" DROP COLUMN "type"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."account_type_type_enum" AS ENUM('FREELANCER', 'EMPLOYER')`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" ADD "type" "public"."account_type_type_enum" NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" ADD CONSTRAINT "UQ_6c1addab805d977e06a7b3853c9" UNIQUE ("type")`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."category" DROP COLUMN "name"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."category_name_enum" AS ENUM('IT', 'Art', 'Construction Worker', 'Foreman', 'Plumber', 'Carpenter', 'Electrician', 'Welder', 'Aircon Repair', 'Gadget Repair')`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."category" ADD "name" "public"."category_name_enum" NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."category" ADD CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name")`
    );
    await queryRunner.manager.insert(AccountType, [
      { type: AccountTypes.FREELANCER },
      { type: AccountTypes.EMPLOYER },
    ]);
    await queryRunner.manager.insert(Category, [
      { name: Categories.IT },
      { name: Categories.ART },
      { name: Categories.CONSTRUCTION_WORKER },
      { name: Categories.FOREMAN },
      { name: Categories.PLUMBER },
      { name: Categories.CARPENTER },
      { name: Categories.ELECTRICIAN },
      { name: Categories.WELDER },
      { name: Categories.AIRCON_REPAIR },
      { name: Categories.GADGET_REPAIR },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(AccountType, {
      type: AccountTypes.FREELANCER,
    });
    await queryRunner.manager.delete(AccountType, {
      type: AccountTypes.EMPLOYER,
    });
    await queryRunner.manager.delete(Category, { name: Categories.IT });
    await queryRunner.manager.delete(Category, { name: Categories.ART });
    await queryRunner.manager.delete(Category, {
      name: Categories.CONSTRUCTION_WORKER,
    });
    await queryRunner.manager.delete(Category, { name: Categories.FOREMAN });
    await queryRunner.manager.delete(Category, { name: Categories.PLUMBER });
    await queryRunner.manager.delete(Category, { name: Categories.WELDER });
    await queryRunner.manager.delete(Category, {
      name: Categories.ELECTRICIAN,
    });
    await queryRunner.manager.delete(Category, {
      name: Categories.AIRCON_REPAIR,
    });
    await queryRunner.manager.delete(Category, {
      name: Categories.GADGET_REPAIR,
    });
    await queryRunner.query(
      `ALTER TABLE "public"."category" DROP CONSTRAINT "UQ_23c05c292c439d77b0de816b500"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."category" DROP COLUMN "name"`
    );
    await queryRunner.query(`DROP TYPE "public"."category_name_enum"`);
    await queryRunner.query(
      `ALTER TABLE "public"."category" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" DROP CONSTRAINT "UQ_6c1addab805d977e06a7b3853c9"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" DROP COLUMN "type"`
    );
    await queryRunner.query(`DROP TYPE "public"."account_type_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" ADD "type" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."account_type" ADD CONSTRAINT "UQ_6c1addab805d977e06a7b3853c9" UNIQUE ("type")`
    );
  }
}
