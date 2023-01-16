import { DataSource } from 'typeorm';

import { Form } from './entities/form.entity';

export const formsProviders = [
  {
    provide: 'FormsRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Form),
    inject: ['DATA_SOURCE'],
  },
];
