import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FindOneParamsDto {
  @IsUUID('4', {
    message: `Precisa informar um id do tipo UUID v4!`,
  })
  id: string;

  @IsString({
    message: `O campo 'name' tem que ser uma string!`,
  })
  @IsOptional()
  name?: string;
}
