import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { FreelancerDTO } from '../../freelancer/dto/freelancer.dto';
import { JobOpeningDTO } from '../../job-opening/dto/job-opening.dto';
import { JobApplicationStatus } from '../types/job-application-status.enum';

export class JobApplicationDTO {
  @IsString()
  @IsOptional()
  public id?: string;

  @IsDateString(undefined, { message: 'Invalid date string' })
  @IsOptional()
  public createdAt?: Date;

  @IsDateString(undefined, { message: 'Invalid date string' })
  @IsOptional()
  public updatedAt?: Date;

  public freelancer?: FreelancerDTO;

  public jobOpening?: JobOpeningDTO;

  @IsEnum(JobApplicationStatus)
  @IsOptional()
  public status?: JobApplicationStatus;
}
