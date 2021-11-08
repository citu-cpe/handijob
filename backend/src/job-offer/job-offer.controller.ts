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
import { CreateJobOfferDTO } from './dto/create-job-offer.dto';
import { JobOfferDTO } from './dto/job-offer.dto';
import { JobOfferService } from './job-offer.service';

@Controller(JobOfferController.JOB_OFFER_API_ROUTE)
export class JobOfferController {
  public static readonly JOB_OFFER_API_ROUTE = 'job-offer';

  constructor(private readonly jobOfferService: JobOfferService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  public getAllJobOffers(): Promise<JobOfferDTO[]> {
    return this.jobOfferService.getAllJobOffers();
  }

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('image', { dest: 'images' }))
  @Post()
  public createJobOffer(
    @Req() { user }: RequestWithUser,
    @Body() createJobOfferDTO: CreateJobOfferDTO,
    @UploadedFile() image: Express.Multer.File
  ): Promise<JobOfferDTO> {
    return this.jobOfferService.createJobOffer(user, createJobOfferDTO, image);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete()
  public deleteJobOffer(
    @Req() { user }: RequestWithUser,
    @Body() jobOfferDTO: JobOfferDTO
  ): Promise<void> {
    return this.jobOfferService.deleteJobOffer(user, jobOfferDTO);
  }
}
