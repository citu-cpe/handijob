import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { CreateNotificationDTO } from './dto/create-notification.dto';
import { NotificationDTO } from './dto/notification.dto';
import { NotificationRepository } from './notification.repository';
import { UserService } from '../user/user.service';
import { NotificationsDTO } from './dto/notifications.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly userService: UserService
  ) {}

  public async getNotifications(user: User): Promise<NotificationsDTO> {
    const notifications = (
      await this.notificationRepository.find({
        where: { user },
        relations: ['user'],
        order: { createdAt: 'DESC' },
      })
    ).map((n) => n.toDTO());

    return {
      numUnread: notifications.filter((n) => !n.seen).length,
      notifications,
    };
  }

  public async createNotification(
    createNotificationDTO: CreateNotificationDTO
  ): Promise<NotificationDTO> {
    const { userId, content } = createNotificationDTO;

    const user = await this.userService.findById(userId);

    const newNotification = this.notificationRepository.create({
      user,
      content,
    });

    const notification = await this.notificationRepository.save(
      newNotification
    );

    return notification.toDTO();
  }

  public async markNotifcationAsRead(notificationId: string) {
    await this.notificationRepository.update(notificationId, { seen: true });
  }
}
