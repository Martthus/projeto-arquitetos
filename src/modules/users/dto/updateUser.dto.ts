import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';

import { UserRole } from '../entities/user.entity';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({
    message: `O campo 'name' tem que ser uma string!`,
  })
  @IsOptional()
  name?: string;

  @IsString({
    message: `O campo 'email' tem que ser uma string!`,
  })
  @IsOptional()
  email?: string;

  @IsString({
    message: `O campo 'phone' tem que ser uma string!`,
  })
  @IsOptional()
  phone?: string;

  @IsString({
    message: `O campo 'gênero' tem que ser uma string!`,
  })
  @IsOptional()
  genre?: string;

  @IsNumber(
    {},
    {
      message: `O campo 'age' tem que ser um número!`,
    },
  )
  @IsOptional()
  age?: number;

  @IsString({
    message: `O campo 'password' deve ser uma string!`,
  })
  password?: string;

  @IsEnum(UserRole, {
    message: `O campo 'role' tem que ser um enum do tipo: architect ou client!`,
  })
  @IsOptional()
  role?: UserRole;
}
