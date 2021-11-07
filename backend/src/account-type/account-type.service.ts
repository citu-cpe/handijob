import { Injectable } from '@nestjs/common';
import { AccountType } from './account-type.entity';
import { AccountTypeRepository } from './account-type.repository';
import { AccountTypes } from './types/account-types.enum';

@Injectable()
export class AccountTypeService {
  constructor(private readonly accountTypeRepository: AccountTypeRepository) {}

  public findByAccountTypes(
    accountTypes: AccountTypes[]
  ): Promise<AccountType[]> {
    return this.accountTypeRepository.findByAccountTypes(accountTypes);
  }
}
