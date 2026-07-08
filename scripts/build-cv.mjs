import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pythonCandidates = process.platform === 'win32' ? ['python', 'python3'] : ['python3', 'python'];

function run(command, args, options = {}) {
  return spawnSync(command, args, {
    cwd: root,
    stdio: 'inherit',
    shell: false,
    ...options,
  });
}

function findPython() {
  for (const command of pythonCandidates) {
    const check = spawnSync(command, ['--version'], {
      cwd: root,
      stdio: 'ignore',
      shell: false,
    });
    if (check.status === 0) return command;
  }
  return null;
}

const python = findPython();
if (!python) {
  console.error('Python non trovato: impossibile generare i PDF del CV.');
  process.exit(1);
}

const deps = run(python, ['-c', 'from PIL import Image, ImageDraw; import reportlab.lib.pagesizes']);
if (deps.status !== 0) {
  const install = run(python, ['-m', 'pip', 'install', '--force-reinstall', '--upgrade', '-r', 'requirements.txt', '--disable-pip-version-check']);
  if (install.status !== 0) process.exit(install.status ?? 1);
}

const generate = run(python, ['scripts/generate-cv-pdf.py']);
process.exit(generate.status ?? 1);
