import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/cateogry.module';
import { EmployerModule } from '../employer/employer.module';
import { JobOfferController } from './job-offer.controller';
import { JobOfferRepository } from './job-offer.repository';
import { JobOfferService } from './job-offer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobOfferRepository]),
    EmployerModule,
    CategoryModule,
  ],
  providers: [JobOfferService],
  exports: [JobOfferService],
  controllers: [JobOfferController],
})
export class JobOfferModule {}
