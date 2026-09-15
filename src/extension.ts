import * as vscode from 'vscode';
import { jump } from './jump';
import { output } from './logger';
import { version } from '../package.json';

export function activate(context: vscode.ExtensionContext): void {
  output.info(`Jump2File v${version}`);
  const command = vscode.commands.registerCommand('jump2file.jump', async () => {
    await jump();
  });
  context.subscriptions.push(command, output);
}
