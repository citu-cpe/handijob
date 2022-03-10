import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { NotificationDTO } from './notification.dto';

export class NotificationsDTO {
  @IsNumber()
  @IsNotEmpty()
  public numUnread: number;

  @ValidateNested({ each: true })
  @IsNotEmpty()
  public notifications: NotificationDTO[];
}
