import require$$1 from 'path';

class GithubPath {
    static workspacePath(path) {
        return path
            ? require$$1.resolve(process.env.GITHUB_WORKSPACE, path)
            : undefined;
    }
}

export { GithubPath };
