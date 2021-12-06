import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class PrivateMessageDTO {
  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsUUID()
  @IsNotEmpty()
  public recipientUserId: string;

  @IsUUID()
  @IsNotEmpty()
  public senderUserId: string;
}
