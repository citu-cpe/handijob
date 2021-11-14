import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { FreelancerDTO } from '../freelancer/dto/freelancer.dto';
import { CreateJobApplicationDTO } from './dto/create-job-application.dto';
import { JobApplicationDTO } from './dto/job-application.dto';
import { JobApplicationService } from './job-application.service';

@Controller(JobApplicationController.JOB_APPLICATION_API_ROUTE)
export class JobApplicationController {
  public static readonly JOB_APPLICATION_API_ROUTE = 'job-application';
  public static readonly GET_FOR_JOB_OPENING_API_ROUTE = 'job-opening';
  public static readonly GET_FOR_FREELANCER_API_ROUTE = 'freelancer';

  constructor(private readonly jobApplicationService: JobApplicationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  public createJobApplication(
    @Body() createJobApplicationDTO: CreateJobApplicationDTO
  ) {
    return this.jobApplicationService.createJobApplication(
      createJobApplicationDTO
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(
    `${JobApplicationController.GET_FOR_JOB_OPENING_API_ROUTE}/:jobOpeningId`
  )
  public getJobApplicationsByJobOpening(
    @Param('jobOpeningId') jobOpeningId: string
  ): Promise<JobApplicationDTO[]> {
    return this.jobApplicationService.getJobApplicationsByJobOpening(
      jobOpeningId
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(`${JobApplicationController.GET_FOR_FREELANCER_API_ROUTE}/:freelancerId`)
  public getJobApplicationsByFreelancer(
    @Param('freelancerId') freelancerId: string
  ): Promise<JobApplicationDTO[]> {
    return this.jobApplicationService.getJobApplicationsByFreelancer(
      freelancerId
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':jobApplicationId')
  public async deleteJobApplication(
    @Body() freelancerDTO: FreelancerDTO,
    @Param('jobApplicationId') jobApplicationId: string
  ) {
    await this.jobApplicationService.deleteJobApplication(
      freelancerDTO.id,
      jobApplicationId
    );
  }
}
