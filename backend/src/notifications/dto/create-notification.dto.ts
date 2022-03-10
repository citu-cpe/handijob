import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDTO {
  @IsUUID()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public content: string;
}
