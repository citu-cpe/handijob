import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FreelancerService } from '../freelancer/freelancer.service';
import { JobOpeningService } from '../job-opening/job-opening.service';
import { CreateJobApplicationDTO } from './dto/create-job-application.dto';
import { JobApplicationDTO } from './dto/job-application.dto';
import { JobApplicationRepository } from './job-application.repository';

@Injectable()
export class JobApplicationService {
  constructor(
    private readonly jobApplicationRepository: JobApplicationRepository,
    private readonly freelancerService: FreelancerService,
    private readonly jobOpeningService: JobOpeningService
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
}
