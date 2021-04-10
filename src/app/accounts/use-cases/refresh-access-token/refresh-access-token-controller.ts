import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { IAppController } from '../../../../protocols/app-controller-protocol';
import { RefreshAccessToken } from './refresh-access-token';

class RefreshAccessTokenController implements IAppController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { refresh_token } = req.body;

    const refreshAccessToken = container.resolve(RefreshAccessToken);

    const access_token = await refreshAccessToken.execute({ refresh_token });

    return res.json({ access_token });
  }
}

export { RefreshAccessTokenController };
