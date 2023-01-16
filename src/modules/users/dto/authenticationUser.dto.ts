import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationUserDto {
  @IsEmail(
    {},
    {
      message: `O campo 'email' deve ser uma string!`,
    },
  )
  @IsNotEmpty({
    message: `O campo 'email' não pode estar vazio!`,
  })
  email: string;

  @IsString({
    message: `O campo 'password' deve ser uma string!`,
  })
  @IsNotEmpty({
    message: `O campo 'password' não pode estar vazio!`,
  })
  password: string;
}
