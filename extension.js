// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const NiMS = require('./nodeInspectMetadataServer');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "NiMS" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.nims', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage(NiMS.getStatus());
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('extension.nims.getTunnelURLs', (args) => {
		let index = NiMS.sessions.findIndex(s => {
			if (s.nodeExeRunner.session.id === vscode.debug.activeDebugSession.id) {
				NiMS.tunnelSession(s)
				.then(tunnel => {
					vscode.window.showInformationMessage(tunnel.url.devtoolsFrontendUrl);
					return true;
				});
			}
		})	
	});

	context.subscriptions.push(disposable);

	let disposable2 = vscode.debug.registerDebugAdapterTrackerFactory('node2', {
		createDebugAdapterTracker(session) {
			this.session = session;
			this.vscode = vscode;
			return {
				//onWillStartSession?(): void;
				/**
				 * The debug adapter is about to receive a Debug Adapter Protocol message from VS Code.
				 */
				//onWillReceiveMessage: m => console.log(`> ${JSON.stringify(m, undefined, 2)}`),
				/**
				 * The debug adapter has sent a Debug Adapter Protocol message to VS Code.
				 */
				//onDidSendMessage: m => console.log(`< ${JSON.stringify(m, undefined, 2)}`),
				onDidSendMessage: m => {
					let debuggerOutput;
					if (m.body && m.body.output) debuggerOutput = m.body.output;
					if (debuggerOutput && debuggerOutput.includes('ws://')) {
						NiMS.addSession({
							session: this.session,
							debuggerOutput
						});
					}
				},
				/**
				 * The debug adapter session is about to be stopped.
				 */
				onWillStopSession: () => {
					let index = NiMS.sessions.findIndex(session => session.nodeExeRunner.session.id === this.session.id);
					if (index !== -1) NiMS.removeSession(index);
				},
				/**
				 * An error with the debug adapter has occured.
				 */
				//onError: e => console.log('Error ' + e),
				/**
				 * The debug adapter has exited with the given exit code or signal.
				 */
				onExit: (code, signal) => {
				}
			};
		}
	});

	context.subscriptions.push(disposable2);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
