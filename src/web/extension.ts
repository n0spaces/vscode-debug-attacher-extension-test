// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

class PedagogicalDebugAdapterTrackerFactory implements vscode.DebugAdapterTrackerFactory {
	createDebugAdapterTracker(session: vscode.DebugSession): vscode.ProviderResult<vscode.DebugAdapterTracker> {
		return {
			onDidSendMessage: message => {
				vscode.window.showInformationMessage(`Reported message type: ${message.type} (${typeof message})`);
			},
			onWillReceiveMessage: message => console.log("Will receive message: " + message),
			onWillStartSession: () => vscode.window.showInformationMessage("Will start session"),
			onWillStopSession: () => vscode.window.showInformationMessage("Will stop session"),
			onError: error => vscode.window.showErrorMessage(`Error: ${error.name} ${error.message}`),
			onExit: (code, signal) => vscode.window.showInformationMessage(`Debug adapter exited with code ${code}: ${signal}`),
		};
	}
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	vscode.debug.onDidStartDebugSession(debugSession => {
		console.log("Starting debugging type: " + debugSession.type);
	});

	vscode.debug.onDidReceiveDebugSessionCustomEvent(ev => console.log("custom event " + ev.event + " " + ev.body));
	vscode.debug.onDidTerminateDebugSession(debugSession => console.log("Terminated debug session: " + debugSession.name));
	vscode.debug.onDidChangeActiveDebugSession(debugSession => console.log(debugSession));

	let debugAdapterTracker = new PedagogicalDebugAdapterTrackerFactory();
	//context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory('python', debugAdapterTracker));
	//context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory('mock', debugAdapterTracker));
	context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory('*', debugAdapterTracker));

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-debug-attacher-extension-test" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-debug-attacher-extension-test.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		console.log('Hello World from vscode-debug-attacher-extension-test in a web extension host!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
