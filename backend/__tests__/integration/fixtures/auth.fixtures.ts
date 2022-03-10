import { AccountType } from '../../../src/account-type/account-type.entity';
import { LoginUserDTO } from '../../../src/authentication/dto/login-user.dto';
import { RegisterUserDTO } from '../../../src/authentication/dto/register-user.dto';
import { User } from '../../../src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpStatus } from '@nestjs/common';
import { AccountTypes } from '../../../src/account-type/types/account-types.enum';
import { LoginResponseDTO } from '../../../src/authentication/dto/login-response.dto';
import { AuthenticationController } from '../../../src/authentication/authentication.controller';

const request = global.request;

const registerRoute =
  AuthenticationController.AUTH_API_ROUTE +
  AuthenticationController.REGISTER_API_ROUTE;

export const createUser = async (
  user: LoginUserDTO | RegisterUserDTO
): Promise<User> => {
  const newUser = new User();

  newUser.id = '';
  newUser.email = user.email;
  newUser.createdAt = new Date();
  newUser.updatedAt = new Date();
  newUser.password = await bcrypt.hash(user.password, 10);

  if (user instanceof RegisterUserDTO) {
    newUser.username = user.username;
    newUser.accountTypes = user.accountTypes.map((accountType) => {
      const accType = new AccountType();
      accType.type = accountType;
      return accType;
    });
  }

  return newUser;
};

export const registerUser = async () => {
  const registerUserDTO: RegisterUserDTO = {
    username: 'new_mock_user',
    email: 'new_mock@mock.com',
    password: 'mock',
    accountTypes: [AccountTypes.FREELANCER],
  };

  const registerUser = await createUser(registerUserDTO);

  const { body } = await request
    .post(registerRoute)
    .send(registerUserDTO)
    .expect(HttpStatus.CREATED);

  const { user, tokens } = body as LoginResponseDTO;

  const { accessToken, refreshToken } = tokens;

  expect(user.email).toBe(registerUser.email);
  expect(accessToken).toBeTruthy();
  expect(refreshToken).toBeTruthy();

  return body;
};
