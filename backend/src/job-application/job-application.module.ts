import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreelancerModule } from '../freelancer/freelancer.module';
import { JobOpeningModule } from '../job-opening/job-opening.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationRepository } from './job-application.repository';
import { JobApplicationService } from './job-application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplicationRepository]),
    JobOpeningModule,
    FreelancerModule,
    NotificationsModule,
  ],
  exports: [JobApplicationService],
  providers: [JobApplicationService],
  controllers: [JobApplicationController],
})
export class JobApplicationModule {}
