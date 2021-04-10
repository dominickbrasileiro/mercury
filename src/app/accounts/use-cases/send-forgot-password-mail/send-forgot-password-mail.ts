import { inject, injectable } from 'tsyringe';
import appEnv from '../../../../env/app-env';
import { AppError } from '../../../../errors/app-error';
import { IAppService } from '../../../../protocols/app-service-protocol';
import { IDateProvider } from '../../../../providers/date-provider/models/date-provider-model';
import { IMailProvider } from '../../../../providers/mail-provider/models/mail-provider-model';
import { resolvePath } from '../../../../utils/file-utils';
import { IUserRepository } from '../../repositories/user-repository/models/user-repository-model';
import { IUserTokenRepository } from '../../repositories/user-token-repository/models/user-token-repository-model';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordMail implements IAppService {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private readonly userTokenRepository: IUserTokenRepository,

    @inject('DateProvider')
    private readonly dateProvider: IDateProvider,

    @inject('MailProvider')
    private readonly mailProvider: IMailProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist!', 400);
    }

    const now = await this.dateProvider.getNow();

    const expirationDate = await this.dateProvider.addHours(now, 2);

    const { token } = await this.userTokenRepository.create({
      user_id: user.id,
      type: 'reset_password_token',
      expiration_date: expirationDate,
    });

    const templatePath = await resolvePath(
      __dirname,
      '..',
      '..',
      'mails',
      'forgot-password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: ``,
        email: user.email,
      },
      subject: '[Mercury] Password Reset',
      data: {
        firstName: user.first_name,
        resetLink: `${appEnv.resetPasswordURL}${token}`,
      },
      path: templatePath,
    });
  }
}

export { SendForgotPasswordMail };
