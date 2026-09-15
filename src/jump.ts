import * as vscode from 'vscode';

import { output } from './logger';
import *  as utils from './utils';


export async function jump(): Promise<void> {
    const editor = vscode.window.activeTextEditor;

    // Not in file editor
    if (!editor) {
        output.appendLine('No active editor.');
        return;
    }

    // Original file
    const originUri = editor.document.uri;
    if (originUri.scheme !== 'file') {
        output.appendLine(`Unsupported document URI: ${originUri.toString()}`);
        return;
    }
    const pathOrigin = originUri.path;  // Normalized path
    output.appendLine(`Origin file: ${pathOrigin}`);

    // Load rules
    const rules = vscode.workspace
        .getConfiguration('jump2file')
        .get<utils.TRule[]>('rules', []);
    // No config
    if (rules.length === 0) {
        output.appendLine('No rules configured.');
        return;
    }

    // Get destination file path
    let pathDestination: string | null = null;
    let rule_create = null;
    for (const rule of rules) {
        try {
            output.appendLine(`Regex TEST: ${rule.from}`);
            pathDestination = utils.getPathDst(pathOrigin, rule.from, rule.to);
            if (pathDestination) {
                rule_create = rule.create;
                output.appendLine('Regex SUCCESS');
                output.appendLine(`Destination file: ${pathDestination}`);
                break;
            }
            output.appendLine('Regex FAILED');
        } catch (error) {
            output.appendLine(`Invalid mapping: ${error instanceof Error ? error.message : String(error)}`);
        }
    }
    if (!pathDestination) {
        output.appendLine('Regex ALL FAILED - END');
        return;
    }

    // Destination file path
    let uriDestination: vscode.Uri | null = null;
    while (!uriDestination) {
        uriDestination = vscode.Uri.file(pathDestination);
        try {
            await vscode.workspace.fs.stat(uriDestination);
            output.appendLine('Destination file EXISTS');
        } catch {
            // Create destination file?
            output.appendLine('Destination file NOT FOUND -> Create?');
            let create: boolean = false;
            if (rule_create == "always") {
                create = true;
                output.appendLine('Create == "yes"');
            } else if (rule_create == "ask") {
                output.appendLine('Create == "ask"');
                if (await utils.askUserCreateFile(pathDestination) == "Yes") {
                    create = true;
                }
            }
            if (create) {
                await utils.createEmptyFile(uriDestination);
            } else {
                output.appendLine('Do not create file - END');
                return
            }
        }
    }

    // Open the destination file
    const document = await vscode.workspace.openTextDocument(uriDestination);
    output.appendLine('Open destination file');
    await vscode.window.showTextDocument(document);
    return;
}