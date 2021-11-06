import { Controller } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';

@Controller(FreelancerController.FREELANCER_API_ROUTE)
export class FreelancerController {
  public static readonly FREELANCER_API_ROUTE = 'freelancer';

  // tslint:disable:no-unused-variable
  constructor(private readonly freelancerService: FreelancerService) {}
}
