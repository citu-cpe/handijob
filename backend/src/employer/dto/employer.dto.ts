import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

export class EmployerDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
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
