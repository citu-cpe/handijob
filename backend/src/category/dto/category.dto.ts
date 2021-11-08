import { IsUUID, IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class CategoryDTO {
  @IsUUID()
  @IsNotEmpty({ message: 'Id is required' })
  public id: string;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public createdAt: Date;

  @IsDateString(undefined, { message: 'Invalid date string' })
  public updatedAt: Date;

  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  public name: string;
}
