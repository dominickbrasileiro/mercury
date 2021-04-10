import { IUserTokenType, UserToken } from '../../../entities/user-token';

interface ICreateUserTokenDTO {
  user_id: string;
  expiration_date: Date;
  type: IUserTokenType;
}

interface IUserTokenRepository {
  create(userTokenData: ICreateUserTokenDTO): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
  findByToken(token: string): Promise<UserToken>;
}

export { IUserTokenRepository, ICreateUserTokenDTO };
