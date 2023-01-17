import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { UsersService } from '../services/users.service';
import { createUserMock } from '@src/__mocks__/users.mock';
import { UsersController } from '../controllers/users.controller';

const moduleMocker = new ModuleMocker(global);

describe('UsersService', () => {
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

  it('Deverá encontrar o service', async () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve acessar o service e simular a criação de um usuário', async () => {
      expect(await service.create(createUserMock[0])).toEqual(createUserMock);
    });
  });
});
