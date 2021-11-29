import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { Employer } from '../employer/employer.entity';
import { EmployerService } from '../employer/employer.service';
import { User } from '../user/user.entity';
import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from '../util/delete-file';
import { JobOpeningRepository } from './job-opening.repository';
import { JobOpeningDTO } from './dto/job-opening.dto';
import { CreateJobOpeningDTO } from './dto/create-job-opening.dto';
import { UserDTO } from '../user/dto/user.dto';

@Injectable()
export class JobOpeningService {
  constructor(
    private readonly jobOpeningRepository: JobOpeningRepository,
    private readonly employerService: EmployerService,
    private readonly categoryService: CategoryService
  ) {}

  public findById(id: string) {
    return this.jobOpeningRepository.findOne(id, {
      relations: ['employer', 'employer.user'],
    });
  }

  public async getAllJobOpenings(): Promise<JobOpeningDTO[]> {
    const jobOpenings = await this.jobOpeningRepository.find({
      relations: ['employer', 'jobApplications', 'jobApplications.freelancer'],
      order: { createdAt: 'DESC' },
    });

    return jobOpenings.map((jobOpening) => jobOpening.toDTO());
  }

  public async getJobOpeningsByEmployer(
    employerId: string
  ): Promise<JobOpeningDTO[]> {
    const employer = await this.employerService.findById(employerId);

    const jobOpenings = await this.jobOpeningRepository.find({
      where: { employer },
      relations: ['employer', 'jobApplications', 'jobApplications.freelancer'],
      order: { createdAt: 'DESC' },
    });

    return jobOpenings.map((jobOpening) => jobOpening.toDTO());
  }

  public async createJobOpening(
    user: User,
    createJobOpeningDTO: CreateJobOpeningDTO,
    image: Express.Multer.File
  ): Promise<JobOpeningDTO> {
    const employer = await this.employerService.findByUser(user);

    if (!employer) {
      throw new BadRequestException(
        'You must have an employer account to create a job opening'
      );
    }

    let imageUrl: string;
    let cloudinaryPublicId: string;

    if (image) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        image.path
      );
      imageUrl = secure_url;
      cloudinaryPublicId = public_id;

      deleteFile(image.path);
    }

    const { categories } = createJobOpeningDTO;

    const categoriesToAdd = await this.categoryService.findByCategories(
      categories
    );

    const newJobOpening = this.jobOpeningRepository.create({
      ...createJobOpeningDTO,
      imageUrl,
      employer,
      categories: categoriesToAdd,
      cloudinaryPublicId,
    });

    const jobOpening = await this.jobOpeningRepository.save(newJobOpening);

    return jobOpening.toDTO();
  }

  public async deleteJobOpening(
    user: User,
    jobOpeningDTO: JobOpeningDTO
  ): Promise<void> {
    let employer: Employer;
    try {
      employer = await this.employerService.findByUser(user);
    } catch (e) {
      throw new BadRequestException('User is not an employer');
    }

    if (employer.id !== jobOpeningDTO.employerId) {
      throw new ForbiddenException('You do not own this job opening');
    }

    const { id, cloudinaryPublicId } = jobOpeningDTO;

    if (cloudinaryPublicId) {
      await cloudinary.uploader.destroy(cloudinaryPublicId);
    }

    const deleteResponse = await this.jobOpeningRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new NotFoundException('Job opening was not found');
    }
  }

  public async getApplicants(
    user: User,
    jobOpeningId: string
  ): Promise<UserDTO[]> {
    let employer: Employer;

    try {
      employer = await this.employerService.findByUser(user);
    } catch (e) {
      throw new BadRequestException('User is not an employer');
    }

    const jobOpening = await this.jobOpeningRepository.findOne(jobOpeningId, {
      relations: [
        'employer',
        'jobApplications',
        'jobApplications.freelancer',
        'jobApplications.freelancer.user',
      ],
    });

    if (employer.id !== jobOpening.employer.id) {
      throw new ForbiddenException('You do not own this job opening');
    }

    return jobOpening.jobApplications.map((j) => j.freelancer.user.toDTO());
  }
}
