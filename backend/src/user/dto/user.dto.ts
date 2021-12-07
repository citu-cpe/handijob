import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AccountTypes } from '../../account-type/types/account-types.enum';
import { EmployerDTO } from '../../employer/dto/employer.dto';
import { FreelancerDTO } from '../../freelancer/dto/freelancer.dto';

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

  @IsString()
  @IsOptional()
  public bio?: string;

  @IsUrl()
  @IsOptional()
  public imageUrl?: string;

  @IsString()
  @IsOptional()
  public cloudinaryPublicId?: string;

  @ValidateNested()
  @IsOptional()
  public employer?: EmployerDTO;

  @ValidateNested()
  @IsOptional()
  public freelancer?: FreelancerDTO;
}
