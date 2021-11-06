import { MigrationInterface, QueryRunner } from 'typeorm';

export class FreelancerEmployerOnDeleteCascade1636193822551
  implements MigrationInterface
{
  name = 'FreelancerEmployerOnDeleteCascade1636193822551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."employer" DROP CONSTRAINT "FK_6b1262606e8e48d624fa5557b3e"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."freelancer" DROP CONSTRAINT "FK_d45d99386b1b9de211dd6db5ea1"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" ADD CONSTRAINT "FK_6b1262606e8e48d624fa5557b3e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."freelancer" ADD CONSTRAINT "FK_d45d99386b1b9de211dd6db5ea1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."freelancer" DROP CONSTRAINT "FK_d45d99386b1b9de211dd6db5ea1"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" DROP CONSTRAINT "FK_6b1262606e8e48d624fa5557b3e"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."freelancer" ADD CONSTRAINT "FK_d45d99386b1b9de211dd6db5ea1" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."employer" ADD CONSTRAINT "FK_6b1262606e8e48d624fa5557b3e" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
