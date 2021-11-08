import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Categories } from '../../category/types/categories.enum';

export class CreateJobOfferDTO {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  public title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  public description: string;

  @IsEnum(Categories, {
    each: true,
    message: 'Each value must be a valid category',
  })
  @ArrayNotEmpty({ message: 'Categories should not be empty' })
  @IsNotEmpty({ message: 'Categories is required' })
  public categories: Categories[];
}
