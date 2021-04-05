import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

interface ICreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
}

class UserRepository {
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

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }
}

export { UserRepository };
