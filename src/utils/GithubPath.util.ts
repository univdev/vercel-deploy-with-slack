import p from 'path';

export class GithubPath {
  static workspacePath(path?: string) {
    return path
      ? p.resolve(process.env.GITHUB_WORKSPACE as string, path)
      : undefined;
  }
}