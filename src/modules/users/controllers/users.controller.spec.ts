import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { createUserMock, updateUserMock } from '@src/__mocks__/users.mock';

const moduleMocker = new ModuleMocker(global);

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        const results = createUserMock;
        if (token === UsersService) {
          return {
            create: jest.fn().mockResolvedValue(results),
            findAll: jest.fn().mockResolvedValue(results),
            findOneById: jest.fn().mockResolvedValue(results),
            update: jest.fn().mockResolvedValue(results),
            remove: jest.fn().mockResolvedValue(results),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = moduleRef.get(UsersController);
    service = moduleRef.get(UsersService);
  });

  it('Deverá encontrar o controller', async () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Deve retornar um array de usuários', async () => {
      expect(await controller.create(new User())).toEqual(createUserMock);
    });
  });

  describe('findAll', () => {
    it('Deve retornar um array de usuários', async () => {
      expect(await controller.findAll()).toEqual(createUserMock);
    });
  });

  describe('findById', () => {
    it('Deve retornar um objeto do usuário', async () => {
      expect(
        await controller.findOneById({ id: createUserMock[0].id }),
      ).toEqual(createUserMock);
    });
  });

  describe('update', () => {
    it('Deve retornar um objeto do usuário atualizado', async () => {
      expect(
        await controller.update(
          { id: updateUserMock[0].id },
          updateUserMock[0],
        ),
      ).toEqual(createUserMock);
    });
  });

  describe('delete', () => {
    it('Deve retornar um objeto de um usuário', async () => {
      expect(await controller.remove({ id: createUserMock[0].id })).toEqual(
        createUserMock,
      );
    });
  });
});
