import { FormStatus } from '@src/modules/forms/entities/form.entity';

export const createFormMock = [
  {
    id: 'e6532580-071c-44b7-a148-ced37be4fb62',
    title: 'Formulário de requisição',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: 'João Felipe',
    email: 'joaolipe@email.com',
    archived: false,
    status: FormStatus.REQUESTED,
    clientId: 'e6531652-071c-99p1-s546-ced37be7fg19',
    architectId: 'e7728580-071c-96k5-a148-ced84be5vn54',
    created_at: '2023-01-16T22:30:24.067Z',
    updated_at: '2023-01-16T22:30:24.067Z',
  },
];

export const updateFormMock = [
  {
    id: 'e6532580-071c-44b7-a148-ced37be4fb62',
    title: 'Formulário de requisição',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    name: 'Maria Luiza',
    email: 'luiza@email.com',
    archived: false,
    status: FormStatus.REFUSED,
    architectId: 'e9588652-071c-99p1-s546-ced66kj7lg35',
    clientId: 'e6531652-071c-99p1-s546-ced37be7fg19',
    created_at: '2023-01-16T22:30:24.067Z',
    updated_at: '2023-01-16T22:30:24.067Z',
  },
];
