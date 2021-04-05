import { Request, Response } from 'express';

import { IAppController } from '../../../protocols/app-controller-protocol';
import { CreateUser } from './create-user';

class CreateUserController implements IAppController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { first_name, last_name, email, password } = req.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({
      first_name,
      last_name,
      email,
      password,
    });

    delete user.password_hash;

    return res.status(201).json(user);
  }
}

export { CreateUserController };
