import { EntityRepository, Repository } from 'typeorm';
import { Freelancer } from './freelancer.entity';

@EntityRepository(Freelancer)
export class FreelancerRepository extends Repository<Freelancer> {}
