import { IUserTokenType, UserToken } from '../../../entities/user-token';

interface ICreateUserTokenDTO {
  user_id: string;
  expiration_date: Date;
  type: IUserTokenType;
}

interface IUserTokenRepository {
  create(userTokenData: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUserTokenRepository, ICreateUserTokenDTO };
