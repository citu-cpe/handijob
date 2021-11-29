import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { Freelancer } from './freelancer.entity';
import { FreelancerRepository } from './freelancer.repository';

@Injectable()
export class FreelancerService {
  constructor(private readonly freelancerRepository: FreelancerRepository) {}

  public save(freelancer: Freelancer) {
    return this.freelancerRepository.save(freelancer);
  }

  public findByUser(user: User): Promise<Freelancer> {
    return this.freelancerRepository.findOne({ user });
  }

  public findById(id: string): Promise<Freelancer> {
    return this.freelancerRepository.findOne(id, { relations: ['user'] });
  }
}
