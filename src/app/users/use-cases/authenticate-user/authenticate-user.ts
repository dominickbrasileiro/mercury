import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/app-error';
import { IAppService } from '../../../../protocols/app-service-protocol';
import { IEncryptProvider } from '../../../../providers/encrypt-provider/models/encrypt-provider-model';
import { IHashProvider } from '../../../../providers/hash-provider/models/hash-provider-model';
import { IUserRepository } from '../../repositories/user-repository/models/user-repository-model';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUser implements IAppService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,

    @inject('EncryptProvider')
    private readonly encryptProvider: IEncryptProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail or password is incorrect!', 401);
    }

    const passwordMatches = await this.hashProvider.compare(
      password,
      user.password_hash,
    );

    if (!passwordMatches) {
      throw new AppError('E-mail or password is incorrect!', 401);
    }

    const token = await this.encryptProvider.encrypt({}, user.id);

    return {
      token,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateUser };