import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { classToClass } from '@nestjs/class-transformer';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { FindOneParamsDto } from '../dto/findOneParams.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwtAuth.guard';
import { RolesGuard } from '../roles.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    const user = await this.usersService.create(data);

    return classToClass(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const user = await this.usersService.findAll();

    return classToClass(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOneById(@Param() params: FindOneParamsDto) {
    const user = this.usersService.findOneById(params);

    return classToClass(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param() params: FindOneParamsDto, @Body() data: UpdateUserDto) {
    const user = await this.usersService.update(params, data);

    return classToClass(user);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param() params: FindOneParamsDto) {
    return await this.usersService.remove(params);
  }
}
