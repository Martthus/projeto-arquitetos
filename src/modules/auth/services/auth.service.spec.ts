import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { AuthService } from '../services/auth.service';
import { createAuthMock, createUserLoginMock } from '@src/__mocks__/auth.mock';
import { AuthController } from '../controllers/auth.controller';

const moduleMocker = new ModuleMocker(global);

describe('AuthService', () => {
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

  it('Deverá encontrar o service', async () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve entrar no service e simular o login', async () => {
      expect(await service.login(createUserLoginMock[0])).toEqual(
        createAuthMock,
      );
    });
  });
});
