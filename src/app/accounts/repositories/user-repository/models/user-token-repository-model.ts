import { UserToken } from '../../../entities/user-token';

interface ICreateUserTokenDTO {
  user_id: string;
  refresh_token: string;
  expiration_date: Date;
}

interface IUserTokenRepository {
  create(userTokenData: ICreateUserTokenDTO): Promise<UserToken>;
}

export { IUserTokenRepository, ICreateUserTokenDTO };
