import { UserRepository } from '../../../src/user/user.repository';
import { MockType } from '../utils/mock.type';

export const mockUserRepositoryFactory: () => MockType<UserRepository> =
  jest.fn(() => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  }));
