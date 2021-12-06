import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { UserService } from './user.service';

@Controller(UserController.USER_API_PATH)
export class UserController {
  public static readonly USER_API_PATH = '/user';

  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  public getUsers(@Req() { user }: RequestWithUser) {
    return this.userService.getAllUsersExceptSelf(user);
  }
}
