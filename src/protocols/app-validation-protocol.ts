import { NextFunction, Request, Response } from 'express';

interface IAppValidation {
  validate(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void>;
}

export { IAppValidation };
