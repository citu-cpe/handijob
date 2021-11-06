import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountTypeController } from './account-type.controller';
import { AccountTypeRepository } from './account-type.repository';
import { AccountTypeService } from './account-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountTypeRepository])],
  providers: [AccountTypeService],
  exports: [AccountTypeService],
  controllers: [AccountTypeController],
})
export class AccountTypeModule {}
