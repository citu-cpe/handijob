import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

export class EmployerDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'Id is required' })
  public id: string;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public createdAt: Date;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public updatedAt: Date;

  @IsString()
  @IsOptional()
  public companyName?: string;

  @IsString()
  @IsOptional()
  public companyDescription?: string;

  @IsString()
  @IsOptional()
  public companyLink?: string;
}
