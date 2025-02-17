import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '@shared/database/sequelize/models/user.model';
import { UserEntity } from './entities/user.entity';
import { PaginationRequestDto } from './dtos/pagination-request.dto';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel)
    private readonly model: typeof UserModel,
  ) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    const user = await this.model.create({
      ...entity,
    });

    if (!user) return undefined;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      function: user.function,
    };
  }

  async findByEmail(email: string) {
    return this.model.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return this.model.findOne({
      where: { id },
    });
  }

  async update(id: string, user: Partial<UserEntity>) {
    await this.model.update(
      { name: user.name, function: user.function },
      {
        where: { id },
      },
    );
    return this.findById(id);
  }

  async findAll(input: PaginationRequestDto) {
    const users = await this.model.findAndCountAll({
      where: this.getFilters(input),
      limit: input.itemPerPage,
      offset: input.itemPerPage * (input.page - 1),
    });

    return users;
  }

  private getFilters(input: PaginationRequestDto) {
    const whereOptions: WhereOptions = {};

    if (input?.email) {
      whereOptions.email = input?.email;
    }
    if (input?.name) {
      whereOptions.name = { [Op.iLike]: `%${input?.name}%` };
    }
    if (input?.function) {
      whereOptions.function = input?.function;
    }

    return whereOptions;
  }
}
