import { Body, Controller, Put, Req } from '@nestjs/common';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { EditEmployerDTO } from './dto/edit-employer.dto';
import { EmployerService } from './employer.service';

@Controller(EmployerController.EMPLOYER_API_ROUTE)
export class EmployerController {
  public static readonly EMPLOYER_API_ROUTE = 'employer';

  constructor(private readonly employerService: EmployerService) {}

  @Put()
  public editEmployer(
    @Req() { user }: RequestWithUser,
    @Body() editEmployerDTO: EditEmployerDTO
  ) {
    return this.employerService.editEmployer(user, editEmployerDTO);
  }
}
