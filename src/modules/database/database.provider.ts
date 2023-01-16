import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'database_architects',
        port: 5432,
        database: process.env.POSTGRES_DB,
        username: process.env.POSTEGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
