import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AccountTypeModule } from '../account-type/account-type.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), AccountTypeModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
