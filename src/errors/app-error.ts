import { IAppError } from '../protocols/app-error-protocol';

class AppError implements IAppError {
  public readonly name = 'AppError';

  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {}
}

export { AppError };
