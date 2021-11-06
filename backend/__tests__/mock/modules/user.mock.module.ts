import { Module } from '@nestjs/common';
import { UserRepository } from '../../../src/user/user.repository';
import { UserService } from '../../../src/user/user.service';
import { mockUserRepositoryFactory } from '../repositories/user.mock.repository';
import { MockAccountTypeModule } from './account-type.module';

@Module({
  imports: [MockAccountTypeModule],
  providers: [
    UserService,
    { provide: UserRepository, useFactory: mockUserRepositoryFactory },
  ],
  exports: [UserService],
})
export class MockUserModule {}
