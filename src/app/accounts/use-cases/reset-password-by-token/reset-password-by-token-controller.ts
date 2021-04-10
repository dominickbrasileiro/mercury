import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IAppController } from '../../../../protocols/app-controller-protocol';
import { ResetPasswordByToken } from './reset-password-by-token';

class ResetPasswordByTokenController implements IAppController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;

    const resetPasswordByToken = container.resolve(ResetPasswordByToken);

    await resetPasswordByToken.execute({ token, password });

    return res.status(204).send();
  }
}

export { ResetPasswordByTokenController };
