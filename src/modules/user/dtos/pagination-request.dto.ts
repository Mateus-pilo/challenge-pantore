import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserFunctionEnum } from '../enum/user-function.enum';

export class PaginationRequestDto {
  @ApiProperty({ description: 'Itens per page' })
  @IsNumber({}, { message: 'Itens per page is not a number' })
  itemPerPage: number;

  @ApiProperty({ description: 'Page' })
  @IsNumber({}, { message: 'Page is not a number' })
  page: number;

  @IsOptional()
  @IsString({ message: 'Nome deve ser uma string' })
  @MaxLength(100, { message: 'Nome deve conter no maximo 100 caracteres' })
  @ApiPropertyOptional({
    description: 'Name user',
    example: 'Jhon Jhow',
  })
  name: string;

  @IsOptional()
  @IsString({ message: 'Email deve ser uma string' })
  @MaxLength(200, { message: 'Email deve conter no maximo 200 caracteres' })
  @ApiPropertyOptional({
    description: 'Email user',
    example: 'example@example.com',
  })
  @IsEmail({}, { message: 'E-mail deve ser válido' })
  email: string;

  @IsOptional()
  @IsEnum(UserFunctionEnum, { message: 'Funcão deve ser ADMIN ou CLIENT' })
  @ApiPropertyOptional({
    description: 'Type user',
    example: 'ADMIN',
  })
  function: UserFunctionEnum;
}
