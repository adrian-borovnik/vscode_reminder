import * as vscode from 'vscode'

export function activate(context: vscode.ExtensionContext) {
	let isRunning = true
	let minutes = 30
	let interval = initInterval(minutes)

	let toggleReminder = vscode.commands.registerCommand('reminder.toggleReminder', () => {
		isRunning = !isRunning
		if (isRunning) {
			interval = initInterval(minutes)
			vscode.window.showInformationMessage('Reminder is on!')
		} else {
			clearInterval(interval)
			vscode.window.showInformationMessage('Reminder is off...')
		}
	})

	let changeInterval = vscode.commands.registerCommand('reminder.changeInterval', () => {
		vscode.window.showInputBox({ prompt: 'Enter the new interval duration in minutes' }).then((value) => {
			if (value) {
				minutes = parseInt(value)
				clearInterval(interval)
				interval = initInterval(minutes)
				vscode.window.showInformationMessage('Interval duration changed to ' + minutes + ' minutes.')
			}
		})
	})

	context.subscriptions.push(toggleReminder)
	context.subscriptions.push(changeInterval)
}

function initInterval(minutes: number = 30) {
	return setInterval(() => {
		const date = new Date()
		const time = date.getHours() + ':' + date.getMinutes()

		const messages = ["Don't forget to merge with the develop branch...", "It's time to merge with the develop branch.", 'Develop branch waits to be merged.', 'Can you even merge develop bro?', 'Imagine not merging with the develop branch...', 'Only a fool would not merge the develop branch...', "You're not gonna merge with the develop branch, are you?"]

		const message = messages[Math.floor(Math.random() * messages.length)]

		vscode.window.showInformationMessage(message, 'Merge', 'Cancel').then((value) => {
			if (value === 'Merge') {
				// run git merge origin/develop in the console
				vscode.window.showInformationMessage('Merging...')
			}
		})
	}, 1000 * 60 * minutes)
}

// This method is called when your extension is deactivated
export function deactivate() {}
