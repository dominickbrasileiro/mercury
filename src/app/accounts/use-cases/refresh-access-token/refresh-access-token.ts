import { inject, injectable } from 'tsyringe';
import authEnv from '../../../../env/auth-env';
import { AppError } from '../../../../errors/app-error';
import { IAppService } from '../../../../protocols/app-service-protocol';
import { IDateProvider } from '../../../../providers/date-provider/models/date-provider-model';
import { IEncryptProvider } from '../../../../providers/encrypt-provider/models/encrypt-provider-model';
import { IUserRepository } from '../../repositories/user-repository/models/user-repository-model';
import { IUserTokenRepository } from '../../repositories/user-token-repository/models/user-token-repository-model';

interface IRequest {
  refresh_token: string;
}

@injectable()
class RefreshAccessToken implements IAppService {
  constructor(
    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,

    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,

    @inject('EncryptProvider')
    private readonly encryptProvider: IEncryptProvider,
  ) {}

  async execute({ refresh_token }: IRequest): Promise<string> {
    const refreshToken = await this.userTokenRepository.findByToken(
      refresh_token,
    );

    if (!refreshToken) {
      throw new AppError('Refresh token does not exist!', 400);
    }

    if (refreshToken.type !== 'refresh_token') {
      throw new AppError('Refresh token does not exist!', 400);
    }

    const user = await this.userRepository.findById(refreshToken.user_id);

    if (!user) {
      throw new AppError('User doest not exist!', 400);
    }

    const now = await this.dateProvider.getNow();

    const tokenExpired = await this.dateProvider.isBefore(
      refreshToken.expiration_date,
      now,
    );

    if (tokenExpired) {
      throw new AppError('Refresh token expired!', 400);
    }

    const accessToken = await this.encryptProvider.encrypt(
      {},
      {
        subject: refreshToken.user_id,
        expiresIn: `${authEnv.accessTokenExpirationMinutes}m`,
      },
    );

    return accessToken;
  }
}

export { RefreshAccessToken };
