import { IsNotEmpty, IsUUID } from 'class-validator';

export class FreelancerDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}
