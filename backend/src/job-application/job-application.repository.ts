import { EntityRepository, Repository } from 'typeorm';
import { Freelancer } from '../freelancer/freelancer.entity';
import { JobOpening } from '../job-opening/job-opening.entity';
import { JobApplication } from './job-application.entity';

@EntityRepository(JobApplication)
export class JobApplicationRepository extends Repository<JobApplication> {
  public findByFreelancer(freelancer: Freelancer): Promise<JobApplication[]> {
    return this.find({
      where: { freelancer },
      relations: ['freelancer', 'jobOpening', 'jobOpening.employer'],
    });
  }

  public findByJobOpening(jobOpening: JobOpening): Promise<JobApplication[]> {
    return this.find({
      where: { jobOpening },
      relations: [
        'freelancer',
        'freelancer.user',
        'freelancer.workExperiences',
        'jobOpening',
        'jobOpening.employer',
      ],
    });
  }
}
