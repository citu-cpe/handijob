import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from '../../user/dto/user.dto';
import { MessageDTO } from './message.dto';

export class RoomDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;

  @ValidateNested({ each: true })
  public messages: MessageDTO[];

  @ValidateNested({ each: true })
  public participants: UserDTO[];

  @IsBoolean()
  @IsNotEmpty()
  public hasUnseenMessages: boolean;

  @IsString()
  @IsOptional()
  public name?: string;
}
