interface IAppService {
  execute(...args: unknown[]): Promise<unknown>;
}

export { IAppService };
