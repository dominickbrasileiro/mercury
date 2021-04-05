import { sign } from 'jsonwebtoken';
import authEnv from '../../../env/auth-env';
import { IEncryptProvider } from '../models/encrypt-provider-model';

class JwtEncryptProvider implements IEncryptProvider {
  async encrypt(payload: object, subject?: string): Promise<string> {
    const encrypted = sign(payload, authEnv.jwtSecret, {
      subject,
      expiresIn: authEnv.jwtExpiresIn,
    });

    return encrypted;
  }
}

export { JwtEncryptProvider };
