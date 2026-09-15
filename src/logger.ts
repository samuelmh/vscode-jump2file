import * as vscode from 'vscode';


export const output = vscode.window.createOutputChannel(
    'Jump2File',
    { log: true }
);