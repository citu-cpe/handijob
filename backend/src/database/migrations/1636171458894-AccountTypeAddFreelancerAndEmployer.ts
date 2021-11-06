import { MigrationInterface, QueryRunner } from 'typeorm';
import { AccountType } from '../../account-type/account-type.entity';

export class AccountTypeAddFreelancerAndEmployer1636171458894
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(AccountType, [
      { type: 'FREELANCER' },
      { type: 'EMPLOYER' },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(AccountType, { type: 'FREELANCER' });
    await queryRunner.manager.delete(AccountType, { type: 'EMPLOYER' });
  }
}
