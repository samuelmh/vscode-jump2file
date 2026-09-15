import * as vscode from 'vscode';
import { jump } from './jump';
import { output } from './logger';

export function activate(context: vscode.ExtensionContext): void {
  const command = vscode.commands.registerCommand('jump2file.jump', async () => {
    await jump();
  });
  context.subscriptions.push(command, output);
}
