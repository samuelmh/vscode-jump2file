import * as vscode from 'vscode';


// Settings configuration
export interface TRule {
    from: string;
    to: string;
    create?: string;  // [yes, ask] (others are no, default)
}

export function getPathDst(pathOrigin: string, from: string, to: string): string | null {
    const match = new RegExp(from).exec(pathOrigin);
    if (!match) { return null; }
    const groups = match.groups ?? {};
    return to.replace(/\{\$([^}]+)\}/g, (placeholder, groupName: string) => {
        if (!(groupName in groups)) {
            return placeholder;
        }
        return groups[groupName] ?? "";
    });
}

export async function askUserCreateFile(pathDst: string) {
    return await vscode.window.showInformationMessage(
        "Jump2File - Destination file seems not to exist.",
        {
            modal: true, // Centered
            detail: `Create file: ${pathDst}`
        },
        "Yes",
        "No"
    );
}

export async function createEmptyFile(fileUri: vscode.Uri): Promise<void> {
    const contenidoVacio = new Uint8Array(0);
    await vscode.workspace.fs.writeFile(fileUri, contenidoVacio);
}