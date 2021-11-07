import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerController } from './freelancer.controller';
import { FreelancerRepository } from './freelancer.repository';
import { FreelancerService } from './freelancer.service';

@Module({
  imports: [TypeOrmModule.forFeature([FreelancerRepository])],
  providers: [FreelancerService],
  controllers: [FreelancerController],
  exports: [FreelancerService],
})
export class FreelancerModule {}
