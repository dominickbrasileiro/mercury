import { container } from 'tsyringe';
import { IHashProvider } from '../providers/hash-provider/hash-provider-model';
import { BcryptHashProvider } from '../providers/hash-provider/implementations/bcrypt-hash-provider';

container.register<IHashProvider>('HashProvider', BcryptHashProvider);
