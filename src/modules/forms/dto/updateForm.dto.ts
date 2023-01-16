import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsEmail,
  IsUUID,
} from 'class-validator';

import { FormStatus } from '../entities/form.entity';
import { CreateFormDto } from './createForm.dto';

export class UpdateFormDto extends PartialType(CreateFormDto) {
  @IsString({
    message: `O campo 'title' deve ser uma string!`,
  })
  @IsOptional()
  title?: string;

  @IsString({
    message: `O campo 'description' deve ser uma string!`,
  })
  @IsOptional()
  description?: string;

  @IsUUID('4', {
    message: `O campo 'clientId' deve ser um UUID!`,
  })
  @IsOptional()
  clientId: string;

  @IsUUID('4', {
    message: `O campo 'architectId' deve ser um UUID!`,
  })
  @IsOptional()
  architectId: string;

  @IsString({
    message: `O campo 'name' deve ser uma string!`,
  })
  @IsOptional()
  name?: string;

  @IsEmail(
    {},
    {
      message: `O campo 'email' deve ser um email valido!`,
    },
  )
  @IsOptional()
  email?: string;

  @IsBoolean({
    message: `O campo 'archived' deve ser um boolean!`,
  })
  archived?: boolean;

  @IsEnum(FormStatus, {
    message: `O campo 'status' deve ser um enum do tipo: requested, accept ou refused!`,
  })
  @IsOptional()
  status?: FormStatus;
}
