import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { FormsController } from './forms.controller';
import { FormsService } from '../services/forms.service';
import { createFormMock, updateFormMock } from '@src/__mocks__/forms.mock';
import { createUserMock } from '@src/__mocks__/users.mock';

const moduleMocker = new ModuleMocker(global);

describe('FormsController', () => {
  let controller: FormsController;
  let service: FormsService;
  let id = { req: { user: { userId: createFormMock[0].id } } };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FormsController],
    })
      .useMocker((token) => {
        const results = createFormMock;
        if (token === FormsService) {
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

    controller = moduleRef.get(FormsController);
    service = moduleRef.get(FormsService);
  });

  it('Deverá encontrar o controller', async () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Deve retornar um array de usuários', async () => {
      expect(
        await controller.create(createFormMock[0], { user: id.req }),
      ).toEqual(createFormMock);
    });
  });

  describe('findAll', () => {
    it('Deve retornar um array de usuários', async () => {
      expect(await controller.findAll({ user: id.req })).toEqual(
        createFormMock,
      );
    });
  });

  describe('findById', () => {
    it('Deve retornar um objeto do usuário', async () => {
      expect(await controller.findOneById({ user: id.req })).toEqual(
        createFormMock,
      );
    });
  });

  describe('update', () => {
    it('Deve retornar um objeto do usuário atualizado', async () => {
      expect(
        await controller.update(
          { id: updateFormMock[0].id },
          updateFormMock[0],
          { user: id.req },
        ),
      ).toEqual(createFormMock);
    });
  });

  describe('delete', () => {
    it('Deve retornar um objeto de um usuário', async () => {
      expect(await controller.remove({ id: createFormMock[0].id })).toEqual(
        createFormMock,
      );
    });
  });
});
