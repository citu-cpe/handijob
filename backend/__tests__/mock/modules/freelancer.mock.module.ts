import { Module } from '@nestjs/common';
import { FreelancerController } from '../../../src/freelancer/freelancer.controller';
import { FreelancerRepository } from '../../../src/freelancer/freelancer.repository';
import { FreelancerService } from '../../../src/freelancer/freelancer.service';
import { mockFreelancerRepositoryFactory } from '../repositories/freelancer.mock.repository';

@Module({
  providers: [
    {
      provide: FreelancerRepository,
      useFactory: mockFreelancerRepositoryFactory,
    },
    FreelancerService,
  ],
  controllers: [FreelancerController],
  exports: [FreelancerService],
})
export class MockFreelancerModule {}
