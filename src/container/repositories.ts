import { container } from 'tsyringe';
import { UserRepositoryImplementation } from '../repositories/user-repository/user-repository-implementation';
import { IUserRepository } from '../repositories/user-repository/user-repository-model';

container.register<IUserRepository>(
  'UserRepository',
  UserRepositoryImplementation,
);
