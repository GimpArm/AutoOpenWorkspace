import * as vscode from 'vscode';
import { join, dirname } from 'path';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
	//If there is already a workspace open then don't do anything.
	if (vscode.workspace.workspaceFile) {
		return;
	}

	//Search for the first .code-workspace file
	vscode.workspace.findFiles("*.code-workspace", "", 1)
		.then((uris: vscode.Uri[]) => {
			if (!uris.length) {
				return;
			}

			//Open the first one by calling the code.cmd script and passing the -r to re-open VS Code.
			//TODO: Make this work on something other than windows.
			const execPath = `"${join(dirname(process.execPath), 'bin', 'code.cmd')}"`;
			exec(`${execPath} -r "${uris[0].fsPath}"`);
		});
}

//Nothing to deactivate
export function deactivate() {}