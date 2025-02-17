import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserCreateRequestDto } from './dtos/user-create-request.dto';
import { UserCreateResponseDto } from './dtos/user-create-response.dto';
import { CryptoUtils } from '@shared/crypto/crypto.util';
import { UserRepository } from './user.repository';
import { UserUpdateRequestDto } from './dtos/user-update-request.dto';
import { PaginationRequestDto } from './dtos/pagination-request.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(input: UserCreateRequestDto): Promise<UserCreateResponseDto> {
    await this.validateEmail(input.email);

    input.password = await CryptoUtils.cryptPassword(input.password);

    const user = await this.userRepository.create({
      name: input.name,
      function: input.function,
      password: input.password,
      email: input.email,
    });

    if (!user) {
      throw new BadRequestException('User create fail');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      function: user.function,
    };
  }

  async update(id: string, input: UserUpdateRequestDto) {
    const user = await this.userRepository.update(id, {
      name: input.name,
      function: input.function,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      function: user.function,
    };
  }

  async search(input: PaginationRequestDto) {
    const users = await this.userRepository.findAll(input);
    console.log(users);

    if (users.count === 0) {
      return {
        currentPage: input.page,
        totalItens: 0,
        totalPages: 0,
        items: [],
      };
    }

    const pagination = {
      currentPage: input.page,
      totalItens: users.count,
      totalPages: Math.round(users.count / input.itemPerPage),
      items: this.mapperToDto(users.rows),
    };

    return pagination;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  private async validateEmail(email: string) {
    const existsUser = await this.userRepository.findByEmail(email);
    if (existsUser) throw new BadRequestException(`User exists`);
  }

  private mapperToDto(users: UserEntity[]) {
    return users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        function: user.function,
      };
    });
  }
}
