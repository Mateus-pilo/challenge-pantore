import { ApiProperty } from '@nestjs/swagger';

export class UserCreateResponseDto {
  @ApiProperty({
    description: 'Id user',
  })
  id: string;

  @ApiProperty({
    description: 'Name user',
  })
  name: string;

  @ApiProperty({
    description: 'Email user',
  })
  email: string;
}
