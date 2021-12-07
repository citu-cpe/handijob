import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class WorkExperienceDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

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
