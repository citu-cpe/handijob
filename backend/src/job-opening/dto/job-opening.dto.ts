import {
  ArrayNotEmpty,
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
  @IsNotEmpty({ message: 'Id is required' })
  public id: string;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public createdAt: Date;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public updatedAt: Date;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  public title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  public description: string;

  @IsUrl(undefined, { message: 'Invalid url' })
  @IsOptional()
  public imageUrl?: string;

  @IsString()
  @IsOptional()
  public cloudinaryPublicId?: string;

  @IsEnum(Categories, {
    each: true,
    message: 'Each value must be a valid category',
  })
  @ArrayNotEmpty({ message: 'Categories should not be empty' })
  @IsNotEmpty({ message: 'Categories is required' })
  public categories: Categories[];

  @IsUUID(undefined, { message: 'Invalid id' })
  @IsNotEmpty({ message: 'Employer id is required' })
  public employerId: string;

  @IsNotEmptyObject({}, { each: true })
  public jobApplications: JobApplicationDTO[];
}
