import {
  ArrayNotEmpty,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { AccountTypes } from '../../account-type/types/account-types.enum';

export class RegisterUserDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsEnum(AccountTypes, { each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  public accountTypes: AccountTypes[];

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  public password: string;
}
