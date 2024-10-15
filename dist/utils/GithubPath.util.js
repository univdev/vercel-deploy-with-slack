import p from 'path';

class GithubPath {
    static workspacePath(path) {
        return path
            ? p.resolve(process.env.GITHUB_WORKSPACE, path)
            : undefined;
    }
}

export { GithubPath };
