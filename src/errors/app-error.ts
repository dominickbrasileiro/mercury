import { IAppError } from '../protocols/i-app-error';

class AppError implements IAppError {
  public readonly name = 'AppError';

  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {}
}

export { AppError };
