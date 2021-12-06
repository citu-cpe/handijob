import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
  IsBoolean,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from '../../user/dto/user.dto';
import { MessageDTO } from './message.dto';

export class RoomDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'Id is required' })
  public id: string;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public createdAt: Date;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public updatedAt: Date;

  @IsNotEmptyObject({}, { each: true })
  @ValidateNested({ each: true })
  public messages: MessageDTO[];

  @IsNotEmptyObject({}, { each: true })
  @ValidateNested({ each: true })
  public participants: UserDTO[];

  @IsBoolean()
  @IsNotEmpty()
  public hasUnseenMessages: boolean;

  @IsString()
  @IsOptional()
  public name?: string;
}
