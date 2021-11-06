import { Injectable } from '@nestjs/common';
import { Freelancer } from './freelancer.entity';
import { FreelancerRepository } from './freelancer.repository';

@Injectable()
export class FreelancerService {
  constructor(private readonly freelancerRepository: FreelancerRepository) {}

  public save(freelancer: Freelancer) {
    return this.freelancerRepository.save(freelancer);
  }
}
