import { FreelancerRepository } from '../../../src/freelancer/freelancer.repository';
import { MockType } from '../utils/mock.type';

export const mockFreelancerRepositoryFactory: () => MockType<FreelancerRepository> =
  jest.fn(() => ({
    find: jest.fn(),
    findOne: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  }));
