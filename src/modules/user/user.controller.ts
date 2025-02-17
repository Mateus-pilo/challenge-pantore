import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateRequestDto } from './dtos/user-create-request.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserCreateResponseDto } from './dtos/user-create-response.dto';
import { UUIDValidation } from '@shared/validations/uuid.validation';
import { UserUpdateRequestDto } from './dtos/user-update-request.dto';
import { PaginationResponseDto } from './dtos/pagination-response.dto';
import { PaginationRequestDto } from './dtos/pagination-request.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
@ApiBearerAuth('authorization')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({
    description: 'Create user',
    summary: 'Create user on database',
  })
  @ApiOkResponse({
    type: UserCreateResponseDto,
    description: 'Create successfuly',
  })
  @Public()
  create(@Body() body: UserCreateRequestDto): Promise<UserCreateResponseDto> {
    return this.userService.create(body);
  }

  @Get('/search')
  @ApiOkResponse({
    type: PaginationResponseDto,
    description: 'Search users',
  })
  findAll(@Query() search: PaginationRequestDto) {
    return this.userService.search(search);
  }

  @Get(':id')
  @ApiOkResponse({
    type: UserCreateResponseDto,
    description: 'Create successfuly',
  })
  findById(
    @Param('id', new UUIDValidation()) id: string,
  ): Promise<UserCreateResponseDto> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @ApiOkResponse({
    type: UserCreateResponseDto,
    description: 'Create successfuly',
  })
  update(
    @Param('id', new UUIDValidation()) id: string,
    @Body() body: UserUpdateRequestDto,
  ): Promise<UserCreateResponseDto> {
    return this.userService.update(id, body);
  }
}
