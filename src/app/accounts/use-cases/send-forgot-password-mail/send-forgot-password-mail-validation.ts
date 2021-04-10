import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IAppValidation } from '../../../../protocols/app-validation-protocol';

class SendForgotPasswordMailValidation implements IAppValidation {
  async validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
    } catch (error) {
      return res.status(400).json(error.details);
    }

    return next();
  }
}

export { SendForgotPasswordMailValidation };
