import { container } from 'tsyringe';
import { TypeORMUserRepository } from '../app/users/repositories/user-repository/implementations/typeorm-user-repository';
import { IUserRepository } from '../app/users/repositories/user-repository/models/user-repository-model';

container.register<IUserRepository>('UserRepository', TypeORMUserRepository);
