import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AccountTypes } from '../../account-type/types/account-types.enum';

export class UserDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'Id is required' })
  public id: string;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public createdAt: Date;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public updatedAt: Date;

  @IsEmail({}, { message: 'Invalid email' })
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  public username: string;

  @IsArray()
  @IsNotEmpty({ message: 'Account types is required' })
  public accountTypes: AccountTypes[];

  @IsUUID()
  @IsOptional()
  public employerId?: string;

  @IsUUID()
  @IsOptional()
  public freelancerId?: string;
}
