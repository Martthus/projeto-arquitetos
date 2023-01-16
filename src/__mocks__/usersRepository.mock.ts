import { CreateUserDto } from '@modules/users/dto/createUser.dto';
import { User } from '@modules/users/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

// export const usersRepositoryMockFactory = jest.fn(() => ({
//   findOneBy: jest.fn((entity) => entity),
// }));

// export const usersRepositoryMockFactory: () => MockType<Repository<User>> =
//   jest.fn(() => ({ findOneBy: jest.fn((entity) => entity) }));

// // export const usersRepositoryMockFactory = jest.Mock

// export type MockType<T> = {
//   [P in keyof T]?: jest.Mock<{}>;
// };

import { v4 as uuid } from 'uuid';

class UsersRepositoryMockFactory {
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  public async create({ email, password }: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }

  public async delete(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      (deleteUser) => deleteUser.id === user.id,
    );

    this.users.splice(findIndex, 1);
  }
}

export default UsersRepositoryMockFactory;
