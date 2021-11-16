import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Employer } from './employer.entity';
import { EmployerRepository } from './employer.repository';

@Injectable()
export class EmployerService {
  constructor(private readonly employerRepository: EmployerRepository) {}

  public save(employer: Employer) {
    return this.employerRepository.save(employer);
  }

  public findByUser(user: User): Promise<Employer> {
    return this.employerRepository.findOne({ user });
  }

  public findById(employerId: string): Promise<Employer> {
    return this.employerRepository.findOne(employerId);
  }
}
