import { container } from 'tsyringe';
import { IHashProvider } from '../providers/hash-provider/models/hash-provider-model';
import { BcryptHashProvider } from '../providers/hash-provider/implementations/bcrypt-hash-provider';
import { IEncryptProvider } from '../providers/encrypt-provider/models/encrypt-provider-model';
import { JwtEncryptProvider } from '../providers/encrypt-provider/implementations/jwt-encrypt-provider';

container.register<IHashProvider>('HashProvider', BcryptHashProvider);
container.register<IEncryptProvider>('Encryptprovider', JwtEncryptProvider);
