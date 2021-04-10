import { sign } from 'jsonwebtoken';
import authEnv from '../../../env/auth-env';
import {
  IEncryptProvider,
  IEncryptProviderOptions,
} from '../models/encrypt-provider-model';

class JwtEncryptProvider implements IEncryptProvider {
  async encrypt(
    payload: object,
    options?: IEncryptProviderOptions,
  ): Promise<string> {
    const encrypted = sign(payload, authEnv.jwtSecret, {
      subject: options.subject,
      expiresIn: options.expiresIn || '1d',
    });

    return encrypted;
  }
}

export { JwtEncryptProvider };
