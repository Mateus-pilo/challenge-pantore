import { ApiProperty } from '@nestjs/swagger';
import { UserCreateResponseDto } from './user-create-response.dto';

export class PaginationResponseDto {
  @ApiProperty({ description: 'Current page' })
  currentPage: number;

  @ApiProperty({ description: 'Total itens' })
  totalItens: number;

  @ApiProperty({ description: 'Total pages' })
  totalPages: number;

  @ApiProperty({ description: 'Items' })
  items: UserCreateResponseDto[];
}
