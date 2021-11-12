import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { CreateJobOpeningDTO } from './dto/create-job-opening.dto';
import { JobOpeningDTO } from './dto/job-opening.dto';
import { JobOpeningService } from './job-opening.service';

@Controller(JobOpeningController.JOB_OPENING_API_ROUTE)
export class JobOpeningController {
  public static readonly JOB_OPENING_API_ROUTE = 'job-opening';

  constructor(private readonly jobOpeningService: JobOpeningService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  public getAllJobOpenings(): Promise<JobOpeningDTO[]> {
    return this.jobOpeningService.getAllJobOpenings();
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
}
