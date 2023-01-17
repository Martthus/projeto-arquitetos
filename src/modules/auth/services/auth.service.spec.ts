import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { UsersService } from '../../users/services/users.service';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from './auth.service';
import { usersProviders } from '@modules/users/users.providers';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DataSource],
      controllers: [AuthController],
      providers: [...usersProviders, UsersService, AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
