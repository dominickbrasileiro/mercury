import { getRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserToken } from '../../../entities/user-token';
import {
  ICreateUserTokenDTO,
  IUserTokenRepository,
} from '../models/user-token-repository-model';

class TypeORMUserTokenRepository implements IUserTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(userTokenData: ICreateUserTokenDTO): Promise<UserToken> {
    const { user_id, expiration_date, type } = userTokenData;

    const userToken = this.repository.create({
      user_id,
      expiration_date,
      type,
      token: uuidv4(),
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByToken(token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({ token });
    return userToken;
  }
}

export { TypeORMUserTokenRepository };
