import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IAppController } from '../../../../protocols/app-controller-protocol';
import { AuthenticateUser } from './authenticate-user';

class AuthenticateUserController implements IAppController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUser);

    const { user, token, refresh_token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user, token, refresh_token });
  }
}

export { AuthenticateUserController };
