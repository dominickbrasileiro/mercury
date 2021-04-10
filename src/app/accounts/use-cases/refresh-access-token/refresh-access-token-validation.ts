import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IAppValidation } from '../../../../protocols/app-validation-protocol';

class RefreshAccessTokenValidation implements IAppValidation {
  async validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const schema = Joi.object({
      refresh_token: Joi.string().uuid().required(),
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

export { RefreshAccessTokenValidation };
