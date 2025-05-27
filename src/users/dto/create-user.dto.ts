import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, MinLength, IsEmail, IsOptional, ValidateNested } from 'class-validator';

class PersonalDataDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ValidateNested()
  @Type(() => PersonalDataDto)
  personalData: PersonalDataDto;
}