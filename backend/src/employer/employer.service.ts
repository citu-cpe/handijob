import { Injectable } from '@nestjs/common';
import { Employer } from './employer.entity';
import { EmployerRepository } from './employer.repository';

@Injectable()
export class EmployerService {
  constructor(private readonly employerRepository: EmployerRepository) {}

  public save(employer: Employer) {
    return this.employerRepository.save(employer);
  }
}
