import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { classToClass } from '@nestjs/class-transformer';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { FindOneParamsDto } from '../dto/findOneParams.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);

    return classToClass(user);
  }

  @Get()
  async findAll() {
    const user = await this.usersService.findAll();

    return classToClass(user);
  }

  @Get(':id')
  async findOneById(@Param() params: FindOneParamsDto) {
    const user = this.usersService.findOneById(params);

    return classToClass(user);
  }

  @Patch(':id')
  async update(@Param() params: FindOneParamsDto, @Body() data: UpdateUserDto) {
    const user = await this.usersService.update(params, data);

    return classToClass(user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param() params: FindOneParamsDto) {
    return await this.usersService.remove(params);
  }
}
