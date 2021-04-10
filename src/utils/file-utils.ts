import path from 'path';
import fs from 'fs';

async function resolvePath(...segments: string[]): Promise<string> {
  return path.resolve(...segments);
}

async function readFile(path: string): Promise<string> {
  const buffer = await fs.promises.readFile(path);
  return buffer.toString('utf-8');
}

export { resolvePath, readFile };
