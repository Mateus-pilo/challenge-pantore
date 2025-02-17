import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestDto {
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
}
