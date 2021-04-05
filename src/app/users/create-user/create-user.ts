import { hash } from 'bcrypt';
import { User } from '../../../entities/user';
import authEnv from '../../../env/auth-env';
import { AppError } from '../../../errors/app-error';
import { IAppService } from '../../../protocols/app-service-protocol';
import { UserRepository } from '../../../repositories/user-repository';

interface IRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

class CreateUser implements IAppService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({
    first_name,
    last_name,
    email,
    password,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('E-mail already used!', 400);
    }

    const password_hash = await hash(password, authEnv.hashSalt);

    const user = await this.userRepository.create({
      first_name,
      last_name,
      email,
      password_hash,
    });

    return user;
  }
}

export { CreateUser };
