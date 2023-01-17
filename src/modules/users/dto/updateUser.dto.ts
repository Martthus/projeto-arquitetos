import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Length,
} from 'class-validator';

import { UserRole } from '../entities/user.entity';
import { CreateUserDto } from './createUser.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({
    message: `O campo 'name' deve ser uma string!`,
  })
  @IsOptional()
  @Length(1, 150, {
    message: `O campo 'name' deve conter entre 1 a 150 caracteres!`,
  })
  name?: string;

  @IsString({
    message: `O campo 'email' deve ser uma string!`,
  })
  @IsOptional()
  @Length(1, 150, {
    message: `O campo 'email' deve conter entre 1 a 150 caracteres!`,
  })
  email?: string;

  @IsString({
    message: `O campo 'phone' deve ser uma string!`,
  })
  @IsOptional()
  @Length(1, 50, {
    message: `O campo 'phone' deve conter entre 1 a 50 caracteres!`,
  })
  phone?: string;

  @IsString({
    message: `O campo 'genre' deve ser uma string!`,
  })
  @IsOptional()
  @Length(1, 50, {
    message: `O campo 'genre' deve conter entre 1 a 50 caracteres!`,
  })
  genre?: string;

  @IsNumber(
    {},
    {
      message: `O campo 'age' deve ser um número!`,
    },
  )
  @IsOptional()
  age?: number;

  @IsString({
    message: `O campo 'password' deve ser uma string!`,
  })
  password?: string;

  @IsEnum(UserRole, {
    message: `O campo 'role' deve ser um enum do tipo: architect ou client!`,
  })
  @IsOptional()
  role?: UserRole;
}
