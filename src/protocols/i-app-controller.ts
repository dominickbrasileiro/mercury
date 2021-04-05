import { Request, Response } from 'express';

interface IAppController {
  handle(req: Request, res: Response): Promise<Response>;
}

export { IAppController };
