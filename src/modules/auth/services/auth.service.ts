import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import ErrorsApp from '@errors/ErrorsApp';

import { UsersService } from '@modules/users/services/users.service';
import { User } from '@modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new ErrorsApp('E-mail ou senha incorretos!', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new ErrorsApp('Email ou senha incorretos!', 401);
    }

    return user;
  }

  async login(user: User) {
    const payload = { name: user.name, id: user.id };

    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
