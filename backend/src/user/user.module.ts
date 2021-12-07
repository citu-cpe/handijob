import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AccountTypeModule } from '../account-type/account-type.module';
import { UserController } from './user.controller';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { EmployerModule } from '../employer/employer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    AccountTypeModule,
    FreelancerModule,
    EmployerModule,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
