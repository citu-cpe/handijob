import { IsNotEmpty, IsNotEmptyObject, IsUUID } from 'class-validator';
import { FreelancerDTO } from '../../freelancer/dto/freelancer.dto';

export class DeleteJobApplicationDTO {
  @IsUUID()
  @IsNotEmpty()
  public jobApplicationId: string;

  @IsNotEmptyObject()
  public freelancerDTO: FreelancerDTO;
}
