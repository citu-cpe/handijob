import {
  ArrayNotEmpty,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { Categories } from '../../category/types/categories.enum';
import { JobApplicationDTO } from '../../job-application/dto/job-application.dto';

export class JobOpeningDTO {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsBoolean()
  @IsNotEmpty()
  public archived: boolean;

  @IsUrl()
  @IsOptional()
  public imageUrl?: string;

  @IsString()
  @IsOptional()
  public cloudinaryPublicId?: string;

  @IsEnum(Categories, {
    each: true,
  })
  @ArrayNotEmpty()
  @IsNotEmpty()
  public categories: Categories[];

  @IsUUID()
  @IsNotEmpty()
  public employerId: string;

  @IsNotEmptyObject({}, { each: true })
  public jobApplications: JobApplicationDTO[];
}
