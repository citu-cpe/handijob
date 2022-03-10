import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Categories } from '../../category/types/categories.enum';

export class CreateJobOpeningDTO {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsEnum(Categories, {
    each: true,
  })
  @ArrayNotEmpty()
  @IsNotEmpty()
  public categories: Categories[];
}
