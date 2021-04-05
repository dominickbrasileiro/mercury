interface IHashProvider {
  hash(value: string): Promise<string>;
}

export { IHashProvider };
