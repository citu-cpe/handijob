import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guards/jwtAuthentication.guard';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { NotificationDTO } from './dto/notification.dto';
import { NotificationsDTO } from './dto/notifications.dto';
import { NotificationService } from './notification.service';

@Controller(NotificationController.NOTIFICATION_API_ROUTE)
export class NotificationController {
  public static readonly NOTIFICATION_API_ROUTE = '/notification';

  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  public async getNotifications(
    @Req() { user }: RequestWithUser
  ): Promise<NotificationsDTO> {
    return this.notificationService.getNotifications(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  public async createNotification(
    @Body() createNotificationDTO: CreateNotificationDTO
  ): Promise<NotificationDTO> {
    return this.notificationService.createNotification(createNotificationDTO);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put()
  public async markNotifcationAsRead(@Body() notificationDTO: NotificationDTO) {
    return this.notificationService.markNotifcationAsRead(notificationDTO.id);
  }
}
