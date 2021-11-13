import { IsNotEmpty, IsString } from 'class-validator';

export class CreateJobApplicationDTO {
  @IsString()
  @IsNotEmpty({ message: 'Freelancer id is required' })
  public freelancerId: string;

  @IsString()
  @IsNotEmpty({ message: 'Job opening id is required' })
  public jobOpeningId: string;
}
