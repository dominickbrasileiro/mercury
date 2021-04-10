import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/app-error';
import { IAppService } from '../../../../protocols/app-service-protocol';
import { IDateProvider } from '../../../../providers/date-provider/models/date-provider-model';
import { IHashProvider } from '../../../../providers/hash-provider/models/hash-provider-model';
import { IUserRepository } from '../../repositories/user-repository/models/user-repository-model';
import { IUserTokenRepository } from '../../repositories/user-token-repository/models/user-token-repository-model';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordByToken implements IAppService {
  constructor(
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,

    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,

    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token does not exist!', 400);
    }

    if (userToken.type !== 'reset_password_token') {
      throw new AppError('Token does not exist!', 400);
    }

    const now = await this.dateProvider.getNow();

    const tokenExpired = await this.dateProvider.isBefore(
      userToken.expiration_date,
      now,
    );

    if (tokenExpired) {
      throw new AppError('Token expired!', 400);
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist!', 400);
    }

    const passwordHash = await this.hashProvider.hash(password);

    user.password_hash = passwordHash;

    await this.userRepository.update(user);
    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordByToken };
