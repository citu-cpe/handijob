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
  @IsEmail({}, { message: 'Invalid email' })
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  public email: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  public username: string;

  @IsEnum(AccountTypes, {
    each: true,
    message: 'Each value must be a valid account type',
  })
  @ArrayNotEmpty({ message: 'Account types should not be empty' })
  @IsNotEmpty({ message: 'Account types is required' })
  public accountTypes: AccountTypes[];

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(4)
  public password: string;
}
