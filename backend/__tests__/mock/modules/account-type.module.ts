import { Module } from '@nestjs/common';
import { AccountTypeController } from '../../../src/account-type/account-type.controller';
import { AccountTypeRepository } from '../../../src/account-type/account-type.repository';
import { AccountTypeService } from '../../../src/account-type/account-type.service';
import { mockAccountTypeRepositoryFactory } from '../repositories/account-type.mock.repository';

@Module({
  providers: [
    {
      provide: AccountTypeRepository,
      useFactory: mockAccountTypeRepositoryFactory,
    },
    AccountTypeService,
  ],
  controllers: [AccountTypeController],
  exports: [AccountTypeService],
})
export class MockAccountTypeModule {}
