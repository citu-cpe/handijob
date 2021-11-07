import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerController } from './employer.controller';
import { EmployerRepository } from './employer.repository';
import { EmployerService } from './employer.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerRepository])],
  providers: [EmployerService],
  controllers: [EmployerController],
  exports: [EmployerService],
})
export class EmployerModule {}
