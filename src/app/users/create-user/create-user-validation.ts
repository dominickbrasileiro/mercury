import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { IAppValidation } from '../../../protocols/app-validation-protocol';

class CreateUserValidation implements IAppValidation {
  async validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
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

export { CreateUserValidation };
