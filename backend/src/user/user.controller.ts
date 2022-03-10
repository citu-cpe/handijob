import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { EditUserDTO } from './dto/edit-user.dto';
import { UserService } from './user.service';

@Controller(UserController.USER_API_PATH)
export class UserController {
  public static readonly USER_API_PATH = '/user';
  public static readonly PROFILE_API_PATH = '/profile/:username';
  public static readonly PROFILE_PICTURE_API_PATH = '/profile-picture';
  public static readonly GET_USER_API_PATH = ':id';

  constructor(private readonly userService: UserService) {}

  @Get()
  public getUsers(@Req() { user }: RequestWithUser) {
    return this.userService.getAllUsersExceptSelf(user);
  }

  @Get(UserController.GET_USER_API_PATH)
  public getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get(UserController.PROFILE_API_PATH)
  public getUserProfile(@Param('username') username: string) {
    return this.userService.getProfile(username);
  }

  @Put()
  public editUser(
    @Req() { user }: RequestWithUser,
    @Body() editUserDTO: EditUserDTO
  ) {
    return this.userService.editUser(user, editUserDTO);
  }

  @UseInterceptors(FileInterceptor('image', { dest: 'images' }))
  @Put(UserController.PROFILE_PICTURE_API_PATH)
  public uploadProfilePicture(
    @Req() { user }: RequestWithUser,
    @UploadedFile() image?: Express.Multer.File
  ) {
    return this.userService.uploadProfilePicture(user, image);
  }

  @Delete(UserController.PROFILE_PICTURE_API_PATH)
  public deleteProfilePicture(@Req() { user }: RequestWithUser) {
    return this.userService.deleteProfilePicture(user);
  }
}
