import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/cateogry.module';
import { EmployerModule } from '../employer/employer.module';
import { JobOpeningController } from './job-opening.controller';
import { JobOpeningRepository } from './job-opening.repository';
import { JobOpeningService } from './job-opening.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobOpeningRepository]),
    EmployerModule,
    CategoryModule,
  ],
  providers: [JobOpeningService],
  exports: [JobOpeningService],
  controllers: [JobOpeningController],
})
export class JobOpeningModule {}
