interface IEncryptProvider {
  encrypt(payload: unknown, subject?: string): Promise<string>;
}

export { IEncryptProvider };
