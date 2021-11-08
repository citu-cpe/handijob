import { EntityRepository, Repository } from 'typeorm';
import { JobOffer } from './job-offer.entity';

@EntityRepository(JobOffer)
export class JobOfferRepository extends Repository<JobOffer> {}
