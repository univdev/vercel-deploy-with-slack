import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'process.env': {},
    require: undefined,
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'VercelDeployWithSlack',
      fileName: 'vercel-deploy-with-slack'
    },
  },
});
