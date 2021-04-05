import { inject, injectable } from 'tsyringe';
import { User } from '../../entities/user';
import { AppError } from '../../../../errors/app-error';
import { IAppService } from '../../../../protocols/app-service-protocol';
import { IHashProvider } from '../../../../providers/hash-provider/models/hash-provider-model';
import { IUserRepository } from '../../repositories/user-repository/models/user-repository-model';

interface IRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUser implements IAppService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,
  ) {}

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

    const password_hash = await this.hashProvider.hash(password);

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
