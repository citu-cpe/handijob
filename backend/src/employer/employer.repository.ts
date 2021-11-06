import { EntityRepository, Repository } from 'typeorm';
import { Employer } from './employer.entity';

@EntityRepository(Employer)
export class EmployerRepository extends Repository<Employer> {}
