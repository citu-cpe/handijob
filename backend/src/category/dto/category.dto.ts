import { IsUUID, IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class CategoryDTO {
  @IsUUID()
  @IsNotEmpty()
  public id: string;

  @IsDateString()
  public createdAt: Date;

  @IsDateString()
  public updatedAt: Date;

  @IsString()
  @IsNotEmpty()
  public name: string;
}
