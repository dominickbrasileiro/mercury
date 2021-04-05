import { hash } from 'bcrypt';
import { IHashProvider } from '../hash-provider-model';

class BcryptHashProvider implements IHashProvider {
  async hash(value: string): Promise<string> {
    const hashed = await hash(value, 12);
    return hashed;
  }
}

export { BcryptHashProvider };
