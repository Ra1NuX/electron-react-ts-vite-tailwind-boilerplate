// esbuild.config.js
import { build } from 'esbuild';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

build({
  entryPoints: [join(__dirname, 'main/index.ts'), join(__dirname, "main/preload.ts")], // Adjust this path if your main file is located somewhere else
  bundle: true,
  platform: 'node',
  external: [
    // 'next',
    'electron', // Don't bundle Electron, it's provided by Electron itself
    // 'electron-updater', // Don't bundle `electron-updater` as it dynamically loads native modules
    // // 'electron-serve',
    // '@sentry/electron',
    // 'app-root-path',
    'node:path',
  ],
  alias: {
    '@core': join(__dirname, 'main'),
  },
  format: 'cjs',
  outExtension: { '.js': '.cjs' },
  loader: {
    '.txt': 'file', // Load .txt files as text
  },
  outdir: 'app', // Output file for the bundled main process
  tsconfig: 'main/tsconfig.json', // Path to the tsconfig.json file
})