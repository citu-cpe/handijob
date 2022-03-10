import { IsUUID, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class NotificationDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsUUID()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsBoolean()
  @IsNotEmpty()
  public seen: boolean;

  @IsString()
  @IsNotEmpty()
  public timeAgo: string;
}
