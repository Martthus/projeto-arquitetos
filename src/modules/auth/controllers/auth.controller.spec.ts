import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { createAuthMock, loginAuthMock } from '@src/__mocks__/auth.mock';

const moduleMocker = new ModuleMocker(global);

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        const results = createAuthMock;
        if (token === AuthService) {
          return {
            login: jest.fn().mockResolvedValue(results),
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

    controller = moduleRef.get(AuthController);
    service = moduleRef.get(AuthService);
  });

  it('Deverá encontrar o controller', async () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Deve retornar um array de usuários', async () => {
      expect(await controller.login(loginAuthMock)).toEqual(createAuthMock);
    });
  });
});
