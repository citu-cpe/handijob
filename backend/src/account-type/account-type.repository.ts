import { EntityRepository, Repository } from 'typeorm';
import { AccountType } from './account-type.entity';
import { AccountTypes } from './types/account-types.enum';

@EntityRepository(AccountType)
export class AccountTypeRepository extends Repository<AccountType> {
  public async findByAccountTypes(
    accountTypes: AccountTypes[]
  ): Promise<AccountType[]> {
    return this.find({
      where: accountTypes.map((accountType) => ({
        type: accountType,
      })),
    });
  }
}
