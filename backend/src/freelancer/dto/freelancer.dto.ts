import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { WorkExperienceDTO } from './work-experience.dto';

export class FreelancerDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @ValidateNested({ each: true })
  public workExperiences: WorkExperienceDTO[];
}
