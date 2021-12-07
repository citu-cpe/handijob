import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerController } from './freelancer.controller';
import { FreelancerRepository } from './freelancer.repository';
import { FreelancerService } from './freelancer.service';
import { WorkExperienceRepository } from './work-experience.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FreelancerRepository, WorkExperienceRepository]),
  ],
  providers: [FreelancerService],
  controllers: [FreelancerController],
  exports: [FreelancerService],
})
export class FreelancerModule {}
