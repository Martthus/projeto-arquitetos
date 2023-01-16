import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import {
  dataSourceMockFactory,
  MockType,
} from '@src/__mocks__/dataSource.mock';

describe('UsersController', () => {
  let dataSourceMock: MockType<DataSource>;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: DataSource,
          useFactory: dataSourceMockFactory,
        },
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  const mockRepository = jest.genMockFromModule<any>('typeorm').Repository;

  it('should be defined', async () => {
    expect(dataSourceMock.getRepository).toBeCalled();
  });
});
