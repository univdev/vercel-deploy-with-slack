import { resolve } from 'path';

export class GithubPath {
  static workspacePath(path?: string) {
    return path
      ? resolve(process.env.GITHUB_WORKSPACE as string, path)
      : undefined;
  }
}