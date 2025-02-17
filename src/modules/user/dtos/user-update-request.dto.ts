import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserFunctionEnum } from '../enum/user-function.enum';

export class UserUpdateRequestDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @MaxLength(100, { message: 'Nome deve conter no maximo 100 caracteres' })
  @ApiPropertyOptional({
    description: 'Name user',
    example: 'Jhon Jhow',
  })
  name?: string;

  @IsOptional()
  @IsEnum(UserFunctionEnum, { message: 'Funcão deve ser ADMIN ou CLIENT' })
  @IsNotEmpty({ message: 'Funcão não pode ser vazio' })
  @ApiPropertyOptional({
    description: 'Type user',
    example: 'ADMIN',
  })
  function?: UserFunctionEnum;
}
