import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FreelancerDTO } from '../freelancer/dto/freelancer.dto';
import { CreateJobApplicationDTO } from './dto/create-job-application.dto';
import { JobApplicationDTO } from './dto/job-application.dto';
import { JobApplicationService } from './job-application.service';

@Controller(JobApplicationController.JOB_APPLICATION_API_ROUTE)
export class JobApplicationController {
  public static readonly JOB_APPLICATION_API_ROUTE = 'job-application';
  public static readonly GET_FOR_JOB_OPENING_API_ROUTE =
    'job-opening/:jobOpeningId';
  public static readonly GET_FOR_FREELANCER_API_ROUTE =
    'freelancer/:freelancerId';
  public static readonly DELETE_JOB_APPLICATION_API_ROUTE = ':jobApplicationId';

  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @Post()
  public createJobApplication(
    @Body() createJobApplicationDTO: CreateJobApplicationDTO
  ) {
    return this.jobApplicationService.createJobApplication(
      createJobApplicationDTO
    );
  }

  @Get(JobApplicationController.GET_FOR_JOB_OPENING_API_ROUTE)
  public getJobApplicationsByJobOpening(
    @Param('jobOpeningId') jobOpeningId: string
  ): Promise<JobApplicationDTO[]> {
    return this.jobApplicationService.getJobApplicationsByJobOpening(
      jobOpeningId
    );
  }

  @Get(JobApplicationController.GET_FOR_FREELANCER_API_ROUTE)
  public getJobApplicationsByFreelancer(
    @Param('freelancerId') freelancerId: string
  ): Promise<JobApplicationDTO[]> {
    return this.jobApplicationService.getJobApplicationsByFreelancer(
      freelancerId
    );
  }

  @Delete(JobApplicationController.DELETE_JOB_APPLICATION_API_ROUTE)
  public async deleteJobApplication(
    @Body() freelancerDTO: FreelancerDTO,
    @Param('jobApplicationId') jobApplicationId: string
  ) {
    await this.jobApplicationService.deleteJobApplication(
      freelancerDTO.id,
      jobApplicationId
    );
  }

  @Put()
  public updateJobApplication(@Body() jobApplicationDTO: JobApplicationDTO) {
    return this.jobApplicationService.updateJobApplication(jobApplicationDTO);
  }
}
