import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsUUID,
  IsOptional,
  IsBoolean,
  Length,
} from 'class-validator';

import { FormStatus } from '../entities/form.entity';

export class CreateFormDto {
  @IsString({
    message: `O campo 'title' deve ser uma string!`,
  })
  @IsNotEmpty({
    message: `O campo 'title' não pode estar vazio!`,
  })
  @Length(1, 150, {
    message: `O campo 'title' deve conter entre 1 a 150 caracteres!`,
  })
  title: string;

  @IsString({
    message: `O campo 'description' deve ser uma string!`,
  })
  @IsNotEmpty({
    message: `O campo 'description' não pode estar vazio!`,
  })
  description: string;

  @IsUUID('4', {
    message: `O campo 'clientId' deve ser um UUID!`,
  })
  @IsOptional()
  clientId: string;

  @IsUUID('4', {
    message: `O campo 'architectId' deve ser um UUID!`,
  })
  @IsNotEmpty({
    message: `O campo 'architectId' não pode estar vazio!`,
  })
  architectId: string;

  @IsString({
    message: `O campo 'name' deve ser uma string!`,
  })
  @IsOptional()
  @Length(1, 150, {
    message: `O campo 'name' deve conter entre 1 a 150 caracteres!`,
  })
  name: string;

  @IsEmail(
    {},
    {
      message: `O campo 'email' deve ser um email valido!`,
    },
  )
  @IsOptional()
  @Length(1, 150, {
    message: `O campo 'email' deve conter entre 1 a 150 caracteres!`,
  })
  email: string;

  @IsBoolean({
    message: `O campo 'archived' deve ser um boolean!`,
  })
  @IsOptional()
  archived: boolean;

  @IsEnum(FormStatus, {
    message: `O campo 'status' deve ser um enum do tipo: requested, accept ou refused!`,
  })
  @IsOptional()
  status: FormStatus;
}
