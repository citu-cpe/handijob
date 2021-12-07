import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDTO {
  @IsEmail({}, { message: 'Invalid email' })
  @IsString()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public username?: string;

  @IsString()
  @IsOptional()
  public bio?: string;
}
