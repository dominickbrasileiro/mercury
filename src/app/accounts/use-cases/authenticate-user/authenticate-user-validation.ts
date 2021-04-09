import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IAppValidation } from '../../../../protocols/app-validation-protocol';

class AuthenticateUserValidation implements IAppValidation {
  async validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    try {
      await schema.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json(error.details);
    }

    return next();
  }
}

export { AuthenticateUserValidation };
