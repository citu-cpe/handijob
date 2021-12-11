import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UserDTO } from '../../user/dto/user.dto';
import { WorkExperienceDTO } from './work-experience.dto';

export class FreelancerDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @ValidateNested({ each: true })
  public workExperiences: WorkExperienceDTO[];

  @ValidateNested()
  @IsOptional()
  public user?: UserDTO;
}
