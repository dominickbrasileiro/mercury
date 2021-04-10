import { container } from 'tsyringe';
import { IHashProvider } from '../providers/hash-provider/models/hash-provider-model';
import { BcryptHashProvider } from '../providers/hash-provider/implementations/bcrypt-hash-provider';
import { IEncryptProvider } from '../providers/encrypt-provider/models/encrypt-provider-model';
import { JwtEncryptProvider } from '../providers/encrypt-provider/implementations/jwt-encrypt-provider';
import { IDateProvider } from '../providers/date-provider/models/date-provider-model';
import { DayJSDateProvider } from '../providers/date-provider/implementations/dayjs-date-provider';
import { IMailProvider } from '../providers/mail-provider/models/mail-provider-model';
import { EtherealMailProvider } from '../providers/mail-provider/implementations/ethereal-mail-implementation';

container.register<IHashProvider>('HashProvider', BcryptHashProvider);
container.register<IEncryptProvider>('EncryptProvider', JwtEncryptProvider);
container.register<IDateProvider>('DateProvider', DayJSDateProvider);
container.register<IMailProvider>('MailProvider', EtherealMailProvider);
