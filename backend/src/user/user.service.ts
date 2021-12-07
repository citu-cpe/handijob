import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDTO } from '../authentication/dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { AccountTypeService } from '../account-type/account-type.service';
import { EditUserDTO } from './dto/edit-user.dto';
import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from '../util/delete-file';
import { UserDTO } from './dto/user.dto';
import { FreelancerService } from '../freelancer/freelancer.service';
import { EmployerService } from '../employer/employer.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly accountTypeService: AccountTypeService,
    private readonly freelancerService: FreelancerService,
    private readonly employerService: EmployerService
  ) {}

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      return user;
    }

    throw new NotFoundException('User with this email does not exist');
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (user) {
      return user;
    }

    throw new NotFoundException('User with this id does not exist');
  }

  public async getProfile(username: string): Promise<UserDTO> {
    const user = await this.userRepository.findOne({ username });
    const employer = await this.employerService.findByUser(user);
    const freelancer = await this.freelancerService.findByUser(user);

    const userDTO = {
      ...user.toDTO(),
      employer: employer && employer.toDTO(),
      freelancer: freelancer && freelancer.toDTO(),
    };

    return userDTO;
  }

  public async register(userData: RegisterUserDTO): Promise<User> {
    const user = await this.fromRegisterDTO(userData);

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    return newUser;
  }

  public async setCurrentRefreshToken(
    refreshToken: string,
    userId: string
  ): Promise<void> {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: string
  ): Promise<User> {
    const user = await this.findById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  public async deleteRefreshToken(userId: string): Promise<UpdateResult> {
    return this.userRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }

  public async getRoomsOfUser(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['rooms'],
    });

    return user.rooms;
  }

  public async getAllUsersExceptSelf(user: User) {
    const users = await this.userRepository.find({
      where: { id: Not(user.id) },
    });

    return users.map((u) => u.toDTO());
  }

  public async editUser(user: User, editUserDTO: EditUserDTO) {
    await this.userRepository.update(user.id, editUserDTO);
    const editedUser = await this.userRepository.findOne(user.id);

    return editedUser.toDTO();
  }

  public async uploadProfilePicture(user: User, image?: Express.Multer.File) {
    let imageUrl: string | undefined;
    let cloudinaryPublicId: string | undefined;

    if (image) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        image.path
      );
      imageUrl = secure_url;
      cloudinaryPublicId = public_id;

      deleteFile(image.path);

      const updatedUser = {
        imageUrl,
        cloudinaryPublicId,
      };

      await this.userRepository.update(user.id, updatedUser);
    }

    const editedUser = await this.userRepository.findOne(user.id);

    return editedUser.toDTO();
  }

  public async deleteProfilePicture(user: User) {
    if (user.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(user.cloudinaryPublicId);

      const updatedUser = {
        imageUrl: undefined,
        cloudinaryPublicId: undefined,
      };

      await this.userRepository.update(user.id, updatedUser);
    }

    const editedUser = await this.userRepository.findOne(user.id);

    return editedUser.toDTO();
  }

  public async fromRegisterDTO(registerDTO: RegisterUserDTO): Promise<User> {
    const { username, email, password, accountTypes } = registerDTO;

    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;

    const accountTypesToAdd = await this.accountTypeService.findByAccountTypes(
      accountTypes
    );
    user.accountTypes = accountTypesToAdd;

    return user;
  }
}
