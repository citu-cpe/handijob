import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { RequestWithUser } from '../authentication/types/request-with-user.interface';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { NotificationDTO } from './dto/notification.dto';
import { NotificationsDTO } from './dto/notifications.dto';
import { NotificationService } from './notification.service';

@Controller(NotificationController.NOTIFICATION_API_ROUTE)
export class NotificationController {
  public static readonly NOTIFICATION_API_ROUTE = '/notification';

  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  public async getNotifications(
    @Req() { user }: RequestWithUser
  ): Promise<NotificationsDTO> {
    return this.notificationService.getNotifications(user);
  }

  @Post()
  public async createNotification(
    @Body() createNotificationDTO: CreateNotificationDTO
  ): Promise<NotificationDTO> {
    return this.notificationService.createNotification(createNotificationDTO);
  }

  @Put()
  public async markNotifcationAsRead(@Body() notificationDTO: NotificationDTO) {
    return this.notificationService.markNotifcationAsRead(notificationDTO.id);
  }
}
