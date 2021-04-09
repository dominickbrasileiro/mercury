import { container } from 'tsyringe';
import { TypeORMUserRepository } from '../app/accounts/repositories/user-repository/implementations/typeorm-user-repository';
import { TypeORMUserTokenRepository } from '../app/accounts/repositories/user-repository/implementations/typeorm-user-token-repository';
import { IUserRepository } from '../app/accounts/repositories/user-repository/models/user-repository-model';
import { IUserTokenRepository } from '../app/accounts/repositories/user-repository/models/user-token-repository-model';

container.register<IUserRepository>('UserRepository', TypeORMUserRepository);
container.register<IUserTokenRepository>(
  'UserTokenRepository',
  TypeORMUserTokenRepository,
);
