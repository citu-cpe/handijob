import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from '../../user/dto/user.dto';
import { RoomDTO } from './room.dto';

export class MessageDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'Id is required' })
  public id: string;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public createdAt: Date;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public updatedAt: Date;

  @IsNotEmpty()
  @IsString()
  public content: string;

  @IsNotEmptyObject()
  @ValidateNested()
  public sender: UserDTO;

  @IsBoolean()
  @IsNotEmpty()
  public self: boolean;

  @IsNotEmpty()
  @IsBoolean()
  public seen: boolean;

  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  public room?: RoomDTO;
}
