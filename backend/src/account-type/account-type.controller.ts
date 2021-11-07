import { Controller } from '@nestjs/common';
import { AccountTypeService } from './account-type.service';

@Controller(AccountTypeController.ACCOUNT_TYPE_API_ROUTE)
export class AccountTypeController {
  public static readonly ACCOUNT_TYPE_API_ROUTE = 'account-type';

  // tslint:disable:no-unused-variable
  constructor(private readonly accountTypeService: AccountTypeService) {}
}
