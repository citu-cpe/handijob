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
  @IsNotEmpty()
  public id: string;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public username: string;

  @IsArray()
  @IsNotEmpty()
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
