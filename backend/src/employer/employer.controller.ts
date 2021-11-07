import { Controller } from '@nestjs/common';
import { EmployerService } from './employer.service';

@Controller(EmployerController.EMPLOYER_API_ROUTE)
export class EmployerController {
  public static readonly EMPLOYER_API_ROUTE = 'employer';

  // tslint:disable:no-unused-variable
  constructor(private readonly employerService: EmployerService) {}
}
