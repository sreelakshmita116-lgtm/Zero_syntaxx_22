import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const executableName = process.platform === 'win32' ? 'uv.exe' : 'uv';
const pathEntries = (process.env.PATH || '').split(path.delimiter);
const pathExecutable = pathEntries
  .map((entry) => path.join(entry, executableName))
  .find(existsSync);
const localExecutable = path.join(os.homedir(), '.local', 'bin', executableName);
const executable = pathExecutable || (existsSync(localExecutable) ? localExecutable : executableName);
const args = [
  'run',
  '--python',
  '3.12',
  '--with-requirements',
  'requirements.txt',
  '--',
  'python',
  '-m',
  'uvicorn',
  'backend.main:app',
  '--host',
  '127.0.0.1',
  '--port',
  '8000'
];
const child = spawn(executable, args, { stdio: 'inherit' });

child.on('error', (error) => {
  console.error(`Could not start uv: ${error.message}`);
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
