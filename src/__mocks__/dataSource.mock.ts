import { DataSource } from 'typeorm';

export const dataSourceMockFactory = jest.fn(() => ({
  findOneBy: jest.fn((entity) => entity),
}));

// export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(
//   () => ({ findOneBy: jest.fn((entity) => entity) }),
// );

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};
