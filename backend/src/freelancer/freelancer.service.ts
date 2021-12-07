import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { CreateWorkExperienceDTO } from './dto/create-work-experience.dto';
import { Freelancer } from './freelancer.entity';
import { FreelancerRepository } from './freelancer.repository';
import { WorkExperienceRepository } from './work-experience.repository';

@Injectable()
export class FreelancerService {
  constructor(
    private readonly freelancerRepository: FreelancerRepository,
    private readonly workExperienceRepository: WorkExperienceRepository
  ) {}

  public save(freelancer: Freelancer) {
    return this.freelancerRepository.save(freelancer);
  }

  public findByUser(user: User): Promise<Freelancer> {
    return this.freelancerRepository.findOne({
      where: { user },
      relations: ['workExperiences'],
    });
  }

  public findById(id: string): Promise<Freelancer> {
    return this.freelancerRepository.findOne(id, { relations: ['user'] });
  }

  public async addWorkExperience(
    user: User,
    createWorkExperienceDTO: CreateWorkExperienceDTO
  ) {
    const freelancer = await this.freelancerRepository.findOne({ user });

    const workExperience = {
      ...this.workExperienceRepository.create(createWorkExperienceDTO),
      freelancer,
    };

    const newWorkExperience = await this.workExperienceRepository.save(
      workExperience
    );

    return newWorkExperience;
  }
}
