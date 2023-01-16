import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString({
    message: `O campo 'name' deve ser uma string!`,
  })
  @IsNotEmpty({
    message: `O campo 'name' não pode estar vazio!`,
  })
  @Length(1, 150, {
    message: `O campo 'name' tem que conter 1 ou até 150 caracteres!`,
  })
  name: string;

  @IsEmail(
    {},
    {
      message: `O campo 'email' deve ser uma string!`,
    },
  )
  @IsNotEmpty({
    message: `O campo 'email' não pode estar vazio!`,
  })
  @Length(1, 150, {
    message: `O campo 'email' tem que conter 1 ou até 150 caracteres!`,
  })
  email: string;

  @IsString({
    message: `O campo 'phone' deve ser uma string!`,
  })
  @IsNotEmpty({
    message: `O campo 'phone' não pode estar vazio!`,
  })
  @Length(1, 50, {
    message: `O campo 'phone' tem que conter 1 ou até 50 caracteres!`,
  })
  phone: string;

  @IsString({
    message: `O campo 'genre' deve ser uma string!`,
  })
  @IsNotEmpty({
    message: `O campo 'genre' não pode estar vazio!`,
  })
  @Length(1, 50, {
    message: `O campo 'genre' tem que conter 1 ou até 50 caracteres!`,
  })
  genre: string;

  @IsNumber(
    {},
    {
      message: `O campo 'age' deve ser um número!`,
    },
  )
  @IsNotEmpty({
    message: `O campo 'age' não pode estar vazio!`,
  })
  age: number;

  @IsString({
    message: `O campo 'password' deve ser uma string!`,
  })
  @IsNotEmpty({
    message: `O campo 'password' não pode estar vazio!`,
  })
  password: string;

  @IsEnum(UserRole, {
    message: `O campo 'role' deve ser um enum do tipo: architect ou client!`,
  })
  @IsNotEmpty({
    message: `O campo 'role' não pode estar vazio!`,
  })
  role: UserRole;
}
