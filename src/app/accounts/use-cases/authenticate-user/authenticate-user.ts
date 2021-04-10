import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/app-error';
import { IAppService } from '../../../../protocols/app-service-protocol';
import { IDateProvider } from '../../../../providers/date-provider/models/date-provider-model';
import { IEncryptProvider } from '../../../../providers/encrypt-provider/models/encrypt-provider-model';
import { IHashProvider } from '../../../../providers/hash-provider/models/hash-provider-model';
import { IUserRepository } from '../../repositories/user-repository/models/user-repository-model';
import { IUserTokenRepository } from '../../repositories/user-token-repository/models/user-token-repository-model';

import authEnv from '../../../../env/auth-env';

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
  access_token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUser implements IAppService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider,

    @inject('EncryptProvider')
    private readonly encryptProvider: IEncryptProvider,

    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,
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

    const accessToken = await this.encryptProvider.encrypt(
      {},
      { subject: user.id },
    );

    const now = await this.dateProvider.getNow();

    const refreshTokenExpirationDate = await this.dateProvider.addDays(
      now,
      authEnv.refreshTokenExpirationDays,
    );

    const refreshToken = await this.userTokenRepository.create({
      user_id: user.id,
      expiration_date: refreshTokenExpirationDate,
      type: 'refresh_token',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken.token,
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    };
  }
}

export { AuthenticateUser };
