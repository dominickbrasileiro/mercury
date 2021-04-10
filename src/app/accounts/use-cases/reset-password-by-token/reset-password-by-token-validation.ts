import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IAppValidation } from '../../../../protocols/app-validation-protocol';

class ResetPasswordByTokenValidation implements IAppValidation {
  async validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const schema = Joi.object({
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
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

export { ResetPasswordByTokenValidation };
