import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { TokenPayload } from './types/token-payload.interface';
import { PostgresErrorCode } from '../database/postgresErrorCodes.enum';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { TokensDTO } from './dto/tokens.dto';
import { FreelancerService } from '../freelancer/freelancer.service';
import { Freelancer } from '../freelancer/freelancer.entity';
import { AccountTypes } from '../account-type/types/account-types.enum';
import { EmployerService } from '../employer/employer.service';
import { Employer } from '../employer/employer.entity';
import { User } from '../user/user.entity';
import { EnvironmentVariableKeys } from '../config/environment-variable-keys';

@Injectable()
export class AuthenticationService {
  private readonly JWT_ACCESS_TOKEN_SECRET = this.configService.get(
    EnvironmentVariableKeys.JWT_ACCESS_TOKEN_SECRET
  );
  private readonly JWT_REFRESH_TOKEN_SECRET = this.configService.get(
    EnvironmentVariableKeys.JWT_REFRESH_TOKEN_SECRET
  );
  private readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME = this.configService.get(
    EnvironmentVariableKeys.JWT_ACCESS_TOKEN_EXPIRATION_TIME
  );
  private readonly JWT_REFRESH_TOKEN_EXPIRATION_TIME = this.configService.get(
    EnvironmentVariableKeys.JWT_REFRESH_TOKEN_EXPIRATION_TIME
  );

  constructor(
    private readonly userService: UserService,
    private readonly freelancerService: FreelancerService,
    private readonly employerService: EmployerService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async login(loginUserDTO: LoginUserDTO): Promise<LoginResponseDTO> {
    const user = await this.getAuthenticatedUser(
      loginUserDTO.email,
      loginUserDTO.password
    );

    const accessToken = this.getJwtAccessToken(user.id);
    const refreshToken = this.getRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    const employer = await this.employerService.findByUser(user);
    const freelancer = await this.freelancerService.findByUser(user);

    const userDTO = user.toDTO();

    if (employer) {
      userDTO.employerId = employer.id;
    }

    if (freelancer) {
      userDTO.freelancerId = freelancer.id;
    }

    return {
      user: userDTO,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  public async register(
    registerUserDTO: RegisterUserDTO
  ): Promise<LoginResponseDTO> {
    const { email, password } = registerUserDTO;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userService.register({
        ...registerUserDTO,
        password: hashedPassword,
      });

      await this.saveAccountTypeEntities(registerUserDTO.accountTypes, user);

      return this.login({ email, password });
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException(
          'User with that username or email already exists'
        );
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }

  public logout(userId: string) {
    this.userService.deleteRefreshToken(userId);
  }

  public async refresh(refreshToken?: string): Promise<TokensDTO> {
    if (!refreshToken) {
      throw new BadRequestException({ invalidRefreshToken: true });
    }

    const payload = this.jwtService.decode(refreshToken) as TokenPayload;

    if (this.tokenExpired(payload.exp)) {
      throw new BadRequestException({ invalidRefreshToken: true });
    }

    const user = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId
    );

    const accessToken = this.getJwtAccessToken(user.id);
    const newRefreshToken = this.getRefreshToken(user.id);
    await this.userService.setCurrentRefreshToken(newRefreshToken, user.id);

    return { accessToken, refreshToken: newRefreshToken };
  }

  private async getAuthenticatedUser(email: string, plainTextPassword: string) {
    const user = await this.userService.findByEmail(email);
    await this.verifyPassword(plainTextPassword, user.password);
    return user;
  }

  private getJwtAccessToken(userId: string) {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: this.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: this.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });

    return token;
  }

  private getRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: this.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: this.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return token;
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private tokenExpired(exp: number) {
    return Date.now() > exp * 1000;
  }

  private async saveAccountTypeEntities(
    accountTypes: AccountTypes[],
    user: User
  ): Promise<void> {
    if (accountTypes.includes(AccountTypes.FREELANCER)) {
      const freelancer = new Freelancer();
      freelancer.user = user;
      await this.freelancerService.save(freelancer);
    }

    if (accountTypes.includes(AccountTypes.EMPLOYER)) {
      const employer = new Employer();
      employer.user = user;
      await this.employerService.save(employer);
    }
  }
}
