import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'User id is required' })
  public userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Content is required' })
  public content: string;
}
