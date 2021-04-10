import { User } from '../../../entities/user';

interface ICreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
}

interface IUserRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { IUserRepository, ICreateUserDTO };
