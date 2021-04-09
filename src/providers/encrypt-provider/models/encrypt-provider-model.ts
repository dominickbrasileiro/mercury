interface IEncryptProviderOptions {
  subject?: string;
  expiresIn?: string;
}
interface IEncryptProvider {
  encrypt(payload: unknown, options?: IEncryptProviderOptions): Promise<string>;
}

export { IEncryptProvider, IEncryptProviderOptions };
