import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('test-runner.run-file', runFile));
	context.subscriptions.push(vscode.commands.registerCommand('test-runner.run-line', runLine));
}

export function deactivate() {}

function runFile() {
	run(getFilePath());
}

function runLine() {
	run(getFilePath(), getLineNumber());
}

function run(filename: string, lineNumber?: number) {
	if (filename === "" || lineNumber === -1) {
		vscode.window.showErrorMessage("Can't run that!");
		return;
	}

	const filetype = getFiletype();
	const runCommand = getRunCommand(filetype);

	if (runCommand === undefined) {
		vscode.window.showInformationMessage("Don't know how to run tests for `" + filetype + "` files.");
		return;
	}

	let testString = runCommand + " " + filename;
	if (lineNumber !== undefined) {
		testString += ":" + lineNumber.toString();
	}

	vscode.commands.executeCommand("workbench.action.terminal.moveToLineEnd");
	vscode.commands.executeCommand("workbench.action.terminal.deleteToLineStart");
	vscode.commands.executeCommand("workbench.action.terminal.sendSequence", { "text": testString + "\n" });
	vscode.commands.executeCommand("workbench.action.terminal.scrollToBottom");
}

function getFilePath() {
	const editor = vscode.window.activeTextEditor;
	return editor === undefined ? "" : editor.document.fileName;
}

function getLineNumber() {
	const editor = vscode.window.activeTextEditor;
	return editor === undefined ? -1 : (editor.selection.active.line + 1);
}

function getFiletype() {
	const editor = vscode.window.activeTextEditor;
	return editor === undefined ? "" : editor.document.languageId;
}

function getRunCommand(filetype: string) {
	if (filetype === "") {
		return;
	}

	const config = vscode.workspace.getConfiguration("test-runner");
	const executorMap = config.get<any>("executorMap");

	return executorMap[filetype];
}
