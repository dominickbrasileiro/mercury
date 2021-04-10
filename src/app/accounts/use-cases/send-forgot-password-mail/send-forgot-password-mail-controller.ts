import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IAppController } from '../../../../protocols/app-controller-protocol';
import { SendForgotPasswordMail } from './send-forgot-password-mail';

class SendForgotPasswordMailController implements IAppController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordMail = container.resolve(SendForgotPasswordMail);

    await sendForgotPasswordMail.execute({ email });

    return res.status(204).send();
  }
}

export { SendForgotPasswordMailController };
