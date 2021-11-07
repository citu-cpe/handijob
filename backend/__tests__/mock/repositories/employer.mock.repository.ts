import { EmployerRepository } from '../../../src/employer/employer.repository';
import { MockType } from '../utils/mock.type';

export const mockEmployerRepositoryFactory: () => MockType<EmployerRepository> =
  jest.fn(() => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  }));
