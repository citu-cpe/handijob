import { EntityRepository, Repository } from 'typeorm';
import { JobOpening } from './job-opening.entity';

@EntityRepository(JobOpening)
export class JobOpeningRepository extends Repository<JobOpening> {}
