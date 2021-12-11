import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreelancerService } from '../freelancer/freelancer.service';
import { JobOpeningService } from '../job-opening/job-opening.service';
import { NotificationService } from '../notifications/notification.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { WebSocketEvents } from '../web-sockets/enum/web-socket-events.enum';
import { CreateJobApplicationDTO } from './dto/create-job-application.dto';
import { JobApplicationDTO } from './dto/job-application.dto';
import { JobApplicationRepository } from './job-application.repository';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly jobApplicationRepository: JobApplicationRepository,
    private readonly freelancerService: FreelancerService,
    private readonly jobOpeningService: JobOpeningService,
    private readonly notificationService: NotificationService,
    private readonly notificationGateway: NotificationsGateway
  ) {}

  public async createJobApplication(
    createJobApplicationDTO: CreateJobApplicationDTO
  ) {
    const freelancer = await this.freelancerService.findById(
      createJobApplicationDTO.freelancerId
    );

    if (!freelancer) {
      throw new NotFoundException('Freelancer not found');
    }

    const jobOpening = await this.jobOpeningService.findById(
      createJobApplicationDTO.jobOpeningId
    );

    if (!jobOpening) {
      throw new NotFoundException('Job opening not found');
    }

    const existingJobApplication = await this.jobApplicationRepository.findOne({
      jobOpening,
      freelancer,
    });

    if (existingJobApplication) {
      throw new BadRequestException('Already applied for this job opening');
    }

    const jobApplication = this.jobApplicationRepository.create({
      freelancer,
      jobOpening,
    });

    await this.jobApplicationRepository.save(jobApplication);

    await this.notificationService.createNotification({
      content: `@${freelancer.user.username} applied for ${jobOpening.title}`,
      userId: jobOpening.employer.user.id,
    });
  }

  public async getJobApplicationsByFreelancer(
    freelancerId: string
  ): Promise<JobApplicationDTO[]> {
    const freelancer = await this.freelancerService.findById(freelancerId);

    if (!freelancer) {
      throw new BadRequestException('User is not a freelancer');
    }

    const jobApplications =
      await this.jobApplicationRepository.findByFreelancer(freelancer);

    return jobApplications.map((j) => j.toDTO());
  }

  public async getJobApplicationsByJobOpening(
    jobOpeningId: string
  ): Promise<JobApplicationDTO[]> {
    const jobOpening = await this.jobOpeningService.findById(jobOpeningId);

    if (!jobOpening) {
      throw new NotFoundException('Job opening not found');
    }

    const jobApplications =
      await this.jobApplicationRepository.findByJobOpening(jobOpening);

    return jobApplications.map((j) => j.toDTO());
  }

  public async deleteJobApplication(
    freelancerId: string,
    jobApplicationId: string
  ) {
    const jobApplication = await this.jobApplicationRepository.findOne(
      jobApplicationId,
      { relations: ['freelancer'] }
    );

    if (!jobApplication) {
      throw new NotFoundException('Job application not found');
    }

    if (jobApplication.freelancer.id !== freelancerId) {
      throw new BadRequestException('You do not own this job application');
    }

    return this.jobApplicationRepository.delete(jobApplicationId);
  }

  public async updateJobApplication(jobApplicationDTO: JobApplicationDTO) {
    const jobApplication = await this.jobApplicationRepository.findOne(
      jobApplicationDTO.id,
      {
        relations: [
          'jobOpening',
          'jobOpening.employer',
          'jobOpening.employer.user',
          'freelancer',
          'freelancer.user',
        ],
      }
    );

    if (!jobApplication) {
      throw new NotFoundException('Job application not found');
    }

    await this.jobApplicationRepository.update(jobApplication.id, {
      status: jobApplicationDTO.status,
    });

    const updatedJobApplication = await this.jobApplicationRepository.findOne(
      jobApplicationDTO.id
    );

    await this.notificationService.createNotification({
      content: `@${jobApplication.jobOpening.employer.user.username} has ${jobApplicationDTO.status} your job application`,
      userId: jobApplication.freelancer.user.id,
    });

    this.notificationGateway.server
      .to(jobApplication.freelancer.user.id)
      .emit(WebSocketEvents.NOTIFICATIONS);

    return updatedJobApplication.toDTO();
  }
}
