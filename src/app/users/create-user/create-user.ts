import { hash } from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '../../../entities/user';
import authEnv from '../../../env/auth-env';
import { AppError } from '../../../errors/app-error';
import { IAppService } from '../../../protocols/i-app-service';

interface IRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

class CreateUser implements IAppService {
  async execute({
    first_name,
    last_name,
    email,
    password,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('E-mail already used!', 400);
    }

    const password_hash = await hash(password, authEnv.hashSalt);

    const user = userRepository.create({
      first_name,
      last_name,
      email,
      password_hash,
    });

    await userRepository.save(user);

    return user;
  }
}

export { CreateUser };
