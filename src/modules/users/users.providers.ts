import { DataSource } from 'typeorm';

import { User } from './entities/user.entity';

export const usersProviders = [
  {
    provide: 'UsersRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
