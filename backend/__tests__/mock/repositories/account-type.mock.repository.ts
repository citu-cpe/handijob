import { AccountTypeRepository } from '../../../src/account-type/account-type.repository';
import { MockType } from '../utils/mock.type';

export const mockAccountTypeRepositoryFactory: () => MockType<AccountTypeRepository> =
  jest.fn(() => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    findByAccountTypes: jest.fn(),
  }));
