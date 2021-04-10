import { getRepository, Repository } from 'typeorm';
import { User } from '../../../entities/user';
import {
  ICreateUserDTO,
  IUserRepository,
} from '../models/user-repository-model';

class TypeORMUserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const { first_name, last_name, email, password_hash } = userData;

    const user = this.repository.create({
      first_name,
      last_name,
      email,
      password_hash,
    });

    await this.repository.save(user);

    return user;
  }

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}

export { TypeORMUserRepository };
