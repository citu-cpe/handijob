import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkExperienceDTO {
  @IsString()
  @IsNotEmpty()
  public yearsOfExperience: string;

  @IsString()
  @IsNotEmpty()
  public jobTitle: string;

  @IsString()
  @IsNotEmpty()
  public jobDescription: string;
}
