import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

import { FormsService } from '../services/forms.service';
import { createFormMock } from '@src/__mocks__/forms.mock';
import { FormsController } from '../constrollers/forms.controller';

const moduleMocker = new ModuleMocker(global);

describe('FormsService', () => {
  let controller: FormsController;
  let service: FormsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FormsController],
    })
      .useMocker((token) => {
        const results = createFormMock;
        if (token === FormsService) {
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

    controller = moduleRef.get(FormsController);
    service = moduleRef.get(FormsService);
  });

  it('Deverá encontrar o service', async () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Deve acessar o service e simular a criação de um formulário', async () => {
      expect(
        await service.create(createFormMock[0], { id: createFormMock[0].id }),
      ).toEqual(createFormMock);
    });
  });
});
