import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from '../controllers/users.controller';
import { dataSourceMockFactory } from '@src/__mocks__/dataSource.mock';
import UsersRepositoryMockFactory from '@src/__mocks__/usersRepository.mock';

const userMock = new User();

let usersRepositoryMockFactory: UsersRepositoryMockFactory;

describe('UsersRepository', () => {
  let service: UsersService;

  beforeEach(async () => {
    usersRepositoryMockFactory = new UsersRepositoryMockFactory();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findByEmail', () => {
    it(`should return the user when the user exists in database.`, async () => {
      await service.create(userMock);

      const fetchedUser = await service.findOneByEmail(userMock.email);

      expect(fetchedUser.email).toEqual(userMock.email);
    });
  });
});
