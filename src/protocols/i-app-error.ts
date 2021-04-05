interface IAppError {
  readonly name: string;
  readonly message: string;
  readonly statusCode: number;
}

export { IAppError };
