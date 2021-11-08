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
import { CreateJobOfferDTO } from './dto/create-job-offer.dto';
import { JobOfferDTO } from './dto/job-offer.dto';
import { JobOfferRepository } from './job-offer.repository';
import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from '../util/delete-file';

@Injectable()
export class JobOfferService {
  constructor(
    private readonly jobOfferRepository: JobOfferRepository,
    private readonly employerService: EmployerService,
    private readonly categoryService: CategoryService
  ) {}

  public async getAllJobOffers(): Promise<JobOfferDTO[]> {
    const jobOffers = await this.jobOfferRepository.find({
      relations: ['employer'],
      order: { createdAt: 'DESC' },
    });

    return jobOffers.map((jobOffer) => jobOffer.toDTO());
  }

  public async createJobOffer(
    user: User,
    createJobOfferDTO: CreateJobOfferDTO,
    image: Express.Multer.File
  ): Promise<JobOfferDTO> {
    let employer: Employer;
    try {
      employer = await this.employerService.findByUser(user);
    } catch (e) {
      throw new BadRequestException('User is not an employer');
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

    const { categories } = createJobOfferDTO;

    const categoriesToAdd = await this.categoryService.findByCategories(
      categories
    );

    const newJobOffer = this.jobOfferRepository.create({
      ...createJobOfferDTO,
      imageUrl,
      employer,
      categories: categoriesToAdd,
      cloudinaryPublicId,
    });

    const jobOffer = await this.jobOfferRepository.save(newJobOffer);

    return jobOffer.toDTO();
  }

  public async deleteJobOffer(
    user: User,
    jobOfferDTO: JobOfferDTO
  ): Promise<void> {
    let employer: Employer;
    try {
      employer = await this.employerService.findByUser(user);
    } catch (e) {
      throw new BadRequestException('User is not an employer');
    }

    if (employer.id !== jobOfferDTO.employerId) {
      throw new ForbiddenException('You do not own this job offer');
    }

    const { id, cloudinaryPublicId } = jobOfferDTO;

    if (cloudinaryPublicId) {
      await cloudinary.uploader.destroy(cloudinaryPublicId);
    }

    const deleteResponse = await this.jobOfferRepository.delete(id);

    if (!deleteResponse.affected) {
      throw new NotFoundException('Job offer was not found');
    }
  }
}
