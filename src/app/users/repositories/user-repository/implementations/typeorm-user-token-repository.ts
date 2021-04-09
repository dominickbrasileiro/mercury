import { getRepository, Repository } from 'typeorm';
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
    const { user_id, expiration_date, refresh_token } = userTokenData;

    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expiration_date,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { TypeORMUserTokenRepository };
