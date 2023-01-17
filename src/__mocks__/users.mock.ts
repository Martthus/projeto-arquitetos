import { UserRole } from '@src/modules/users/entities/user.entity';

export const createUserMock = [
  {
    id: '93a19ccf-5bcf-481c-b113-41b2f3ae2518',
    name: 'Russell Fritsch',
    email: 'Lucas.Fisher@hotmail.com',
    phone: '258-693-3428',
    genre: 'B',
    age: 25,
    role: UserRole.ARCHITECT,
    password: '723_3hfecfvvw&s8wf11f',
    created_at: '2023-01-16T22:26:29.953Z',
    updated_at: '2023-01-16T22:26:29.953Z',
  },
];

export const updateUserMock = [
  {
    id: '93a19ccf-5bcf-481c-b113-41b2f3ae2518',
    name: 'Fritsch Russell',
    email: 'Russell.Fisher@hotmail.com',
    phone: '123-693-3428',
    genre: 'F',
    age: 31,
    role: UserRole.CLIENT,
    created_at: '2023-01-16T22:26:29.953Z',
    updated_at: '2023-01-25T22:26:29.953Z',
  },
];
