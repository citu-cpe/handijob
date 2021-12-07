import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { EditUserDTO } from './dto/edit-user.dto';
import { UserService } from './user.service';

@Controller(UserController.USER_API_PATH)
export class UserController {
  public static readonly USER_API_PATH = '/user';
  public static readonly PROFILE_API_PATH = '/profile/:username';
  public static readonly PROFILE_PICTURE_API_PATH = '/profile-picture';

  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  public getUsers(@Req() { user }: RequestWithUser) {
    return this.userService.getAllUsersExceptSelf(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  public getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(UserController.PROFILE_API_PATH)
  public getUserProfile(@Param('username') username: string) {
    return this.userService.getProfile(username);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put()
  public editUser(
    @Req() { user }: RequestWithUser,
    @Body() editUserDTO: EditUserDTO
  ) {
    return this.userService.editUser(user, editUserDTO);
  }

  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('image', { dest: 'images' }))
  @Put(UserController.PROFILE_PICTURE_API_PATH)
  public uploadProfilePicture(
    @Req() { user }: RequestWithUser,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return this.userService.uploadProfilePicture(user, image);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(UserController.PROFILE_PICTURE_API_PATH)
  public deleteProfilePicture(@Req() { user }: RequestWithUser) {
    return this.userService.deleteProfilePicture(user);
  }
}
