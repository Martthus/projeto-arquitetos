import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import ErrorsApp from '@errors/ErrorsApp';

import { CreateUserDto } from '../dto/createUser.dto';
import { FindOneParamsDto } from '../dto/findOneParams.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    let password: string;

    password = await hash(data.password, 9);

    const createUser = this.usersRepository.create({ ...data, password });

    await this.usersRepository.save(createUser);

    return createUser;
  }

  async findAll(): Promise<User[]> {
    const listUsers = await this.usersRepository.find();

    return listUsers;
  }

  async findOneById(params: FindOneParamsDto): Promise<User> {
    const searchUser = this.usersRepository.findOneBy({ id: params.id });

    if (!searchUser) {
      throw new ErrorsApp('Usuário não encontrado!', 404);
    }

    return searchUser;
  }

  async findOneByEmail(data: string): Promise<User> {
    const searchUser = await this.usersRepository.findOneBy({
      email: data,
    });

    if (!searchUser) {
      throw new ErrorsApp('Usuário não encontrado!', 404);
    }

    return searchUser;
  }

  async update(params: FindOneParamsDto, data: UpdateUserDto): Promise<User> {
    const searchUser = await this.usersRepository.findOne({
      where: { id: params.id },
    });

    if (!searchUser) {
      throw new ErrorsApp('Usuário não encontrado!', 404);
    }

    const userUpdate = await this.usersRepository.update(searchUser.id, data);

    const updatedUser = { ...userUpdate, searchUser };

    return updatedUser.searchUser;
  }

  async remove(params: FindOneParamsDto) {
    const searchUser = await this.usersRepository.findOne({
      where: { id: params.id },
    });

    if (!searchUser) {
      throw new ErrorsApp('Usuário não encontrado!', 404);
    }

    return await this.usersRepository.delete({ id: params.id });
  }
}
