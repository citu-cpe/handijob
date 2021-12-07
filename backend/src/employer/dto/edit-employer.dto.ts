import { IsString, IsOptional } from 'class-validator';

export class EditEmployerDTO {
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
