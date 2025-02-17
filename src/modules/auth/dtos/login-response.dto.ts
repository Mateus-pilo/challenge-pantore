import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ description: 'Access token' })
  token: string;

  @ApiProperty({ description: 'Expiration token' })
  expiration: string;
}
