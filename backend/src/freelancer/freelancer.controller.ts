import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { CreateWorkExperienceDTO } from './dto/create-work-experience.dto';
import { FreelancerService } from './freelancer.service';

@Controller(FreelancerController.FREELANCER_API_ROUTE)
export class FreelancerController {
  public static readonly FREELANCER_API_ROUTE = 'freelancer';
  public static readonly WORK_EXPERIENCE_API_ROUTE = 'work-experience';

  constructor(private readonly freelancerService: FreelancerService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post(FreelancerController.WORK_EXPERIENCE_API_ROUTE)
  public addWorkExperience(
    @Req() { user }: RequestWithUser,
    @Body() createWorkExperienceDTO: CreateWorkExperienceDTO
  ) {
    return this.freelancerService.addWorkExperience(
      user,
      createWorkExperienceDTO
    );
  }
}
