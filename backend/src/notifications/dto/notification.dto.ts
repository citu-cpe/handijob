import { IsUUID, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class NotificationDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'Id is required' })
  public id: string;

  @IsUUID()
  @IsNotEmpty({ message: 'User id is required' })
  public userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  public content: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'Seen is required' })
  public seen: boolean;

  @IsString()
  @IsNotEmpty({ message: 'Time ago is required' })
  public timeAgo: string;
}
