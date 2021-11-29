import {
  ArrayNotEmpty,
  IsInstance,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { NotificationDTO } from './notification.dto';

export class NotificationsDTO {
  @IsNumber()
  @IsNotEmpty()
  public numUnread: number;

  @IsInstance(NotificationDTO, { each: true })
  @ArrayNotEmpty({ message: 'Notifications should not be empty' })
  @IsNotEmpty({ message: 'Notifications is required' })
  public notifications: NotificationDTO[];
}
