import { container } from 'tsyringe';
import { TypeORMUserRepository } from '../repositories/user-repository/implementations/typeorm-user-repository';
import { IUserRepository } from '../repositories/user-repository/models/user-repository-model';

container.register<IUserRepository>('UserRepository', TypeORMUserRepository);
