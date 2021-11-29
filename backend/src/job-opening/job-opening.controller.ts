import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { UserDTO } from '../user/dto/user.dto';
import { CreateJobOpeningDTO } from './dto/create-job-opening.dto';
import { JobOpeningDTO } from './dto/job-opening.dto';
import { JobOpeningService } from './job-opening.service';

@Controller(JobOpeningController.JOB_OPENING_API_ROUTE)
export class JobOpeningController {
  public static readonly JOB_OPENING_API_ROUTE = '/job-opening';
  public static readonly GET_FOR_EMPLOYER_API_ROUTE = '/employer/:employerId';
  public static readonly GET_JOB_APPLICANTS = '/:jobOpeningId/applicants';
  public static readonly ARCHIVE_JOB_OPENING = '/archive';

  constructor(private readonly jobOpeningService: JobOpeningService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  public getAllJobOpenings(): Promise<JobOpeningDTO[]> {
    return this.jobOpeningService.getAllJobOpenings();
  }

  @Get(JobOpeningController.GET_FOR_EMPLOYER_API_ROUTE)
  public getJobOpeningsByEmployer(
    @Param('employerId') employerId: string
  ): Promise<JobOpeningDTO[]> {
    return this.jobOpeningService.getJobOpeningsByEmployer(employerId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('image', { dest: 'images' }))
  @Post()
  public createJobOpening(
    @Req() { user }: RequestWithUser,
    @Body() createJobOpeningDTO: CreateJobOpeningDTO,
    @UploadedFile() image: Express.Multer.File
  ): Promise<JobOpeningDTO> {
    return this.jobOpeningService.createJobOpening(
      user,
      createJobOpeningDTO,
      image
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete()
  public deleteJobOpening(
    @Req() { user }: RequestWithUser,
    @Body() jobOpeningDTO: JobOpeningDTO
  ): Promise<void> {
    return this.jobOpeningService.deleteJobOpening(user, jobOpeningDTO);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(JobOpeningController.ARCHIVE_JOB_OPENING)
  public archiveJobOpening(
    @Req() { user }: RequestWithUser,
    @Body() jobOpeningDTO: JobOpeningDTO
  ): Promise<void> {
    return this.jobOpeningService.archiveJobOpening(user, jobOpeningDTO);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(JobOpeningController.GET_JOB_APPLICANTS)
  public getApplicants(
    @Req() { user }: RequestWithUser,
    @Param('jobOpeningId') jobOpeningId: string
  ): Promise<UserDTO[]> {
    return this.jobOpeningService.getApplicants(user, jobOpeningId);
  }
}
