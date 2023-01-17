import { UserRole } from '@src/modules/users/entities/user.entity';

export const createAuthMock = [
  {
    user: {
      name: 'João Felipe',
      id: 'e6531652-071c-99p1-s546-ced37be7fg19',
    },
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFja2llIEhpbGxzIiwiaWQiOiJkOWYwNjk4Yi03MjE0LTQwMDUtYWQ5Yi1jZmMzMjE3YWJiMTYiLCJpYXQiOjE2NzM5MDgyMDIsImV4cCI6MTY3MzkyNjIwMn0.fFNQ883Ur-pe-_ERywZs1ZuR-SPAegVwFZVLm2PP17I',
  },
];

export const loginAuthMock = [
  {
    email: 'lipe@gmail.com',
    password: '723_3hfecfvvw&s8wf11f',
  },
];
export const createUserLoginMock = [
  {
    id: '93a19ccf-5bcf-481c-b113-41b2f3ae2518',
    name: 'Russell Fritsch',
    email: 'Lucas.Fisher@hotmail.com',
    phone: '258-693-3428',
    genre: 'B',
    age: 25,
    role: UserRole.ARCHITECT,
    password: '723_3hfecfvvw&s8wf11f',
    solicitation: [],
    request: [],
    created_at: new Date('2023-01-16T22:26:29.953Z'),
    updated_at: new Date('2023-01-16T22:26:29.953Z'),
  },
];
