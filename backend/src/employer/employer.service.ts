import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { EditEmployerDTO } from './dto/edit-employer.dto';
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

  public async editEmployer(user: User, editEmployerDTO: EditEmployerDTO) {
    const employer = await this.employerRepository.findOne({ user });

    await this.employerRepository.update(employer.id, editEmployerDTO);

    const editedEmployer = await this.employerRepository.findOne({ user });

    return editedEmployer;
  }
}
