import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserFunctionEnum } from '../enum/user-function.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequestDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @MaxLength(100, { message: 'Nome deve conter no maximo 100 caracteres' })
  @ApiProperty({
    description: 'Name user',
    example: 'Jhon Jhow',
  })
  name: string;

  @IsString({ message: 'Password deve ser uma string' })
  @IsNotEmpty({ message: 'Password não pode ser vazio' })
  @MaxLength(200, { message: 'Password deve conter no maximo 200 caracteres' })
  @ApiProperty({
    description: 'Password user',
    example: 'Example12$',
  })
  password: string;

  @IsString({ message: 'Email deve ser uma string' })
  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @MaxLength(200, { message: 'Email deve conter no maximo 200 caracteres' })
  @ApiProperty({
    description: 'Email user',
    example: 'example@example.com',
  })
  @IsEmail({}, { message: 'E-mail deve ser válido' })
  email: string;

  @IsEnum(UserFunctionEnum, { message: 'Funcão deve ser ADMIN ou CLIENT' })
  @IsNotEmpty({ message: 'Funcão não pode ser vazio' })
  @ApiProperty({
    description: 'Type user',
    example: 'ADMIN',
  })
  function: UserFunctionEnum;
}
