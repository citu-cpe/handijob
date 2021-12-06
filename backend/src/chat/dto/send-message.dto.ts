import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SendMessageDTO {
  @IsString()
  @IsNotEmpty()
  public content: string;

  @IsUUID()
  @IsNotEmpty()
  public roomId: string;
}
