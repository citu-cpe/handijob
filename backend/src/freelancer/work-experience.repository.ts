import { EntityRepository, Repository } from 'typeorm';
import { WorkExperience } from './work-experience.entity';

@EntityRepository(WorkExperience)
export class WorkExperienceRepository extends Repository<WorkExperience> {}
