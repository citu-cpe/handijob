import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { EditEmployerDTO } from './dto/edit-employer.dto';
import { EmployerService } from './employer.service';

@Controller(EmployerController.EMPLOYER_API_ROUTE)
export class EmployerController {
  public static readonly EMPLOYER_API_ROUTE = 'employer';

  constructor(private readonly employerService: EmployerService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Put()
  public editEmployer(
    @Req() { user }: RequestWithUser,
    @Body() editEmployerDTO: EditEmployerDTO
  ) {
    return this.employerService.editEmployer(user, editEmployerDTO);
  }
}
