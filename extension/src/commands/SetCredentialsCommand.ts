import { injectable } from 'inversify'

import { authenticate } from 'unofficial-grammarly-api'
import { commands, Disposable, env, Uri, UriHandler, window } from 'vscode'
import { getKeyTar } from '../keytar'
import { form, input } from '../form'
import { AuthParams, Registerable } from '../interfaces'

@injectable()
export class AuthenticationService implements Registerable, UriHandler {
  register() {
    commands.executeCommand('setContext', 'grammarly:isAnonymous', true)

    return Disposable.from(
      commands.registerCommand('grammarly.setCredentials', this.execute.bind(this)),
      commands.registerCommand('grammarly.login', this.handleLogin.bind(this)),
      window.registerUriHandler(this),
    )
  }

  handleUri(uri: Uri) {
    if (uri.path === '/auth/callback') {
    }
  }

  handleLogin() {
    env.openExternal(Uri.parse('https://grammarly.com/login?source=extension'))
  }

  private async execute() {
    const credentials = await getKeyTar().findCredentials('vscode-grammarly')
    const currentData: AuthParams = { username: '', password: '' }

    if (credentials.length) {
      currentData.username = credentials[0].account
      currentData.password = credentials[0].password
    }

    const newData = await form<AuthParams>('Login to grammarly.com', [
      input('username', 'Username', {
        placeholder: 'username',
        value: currentData.username,
      }),
      input('password', 'Password', {
        placeholder: 'password',
        validate: async (password, { username }) => {
          await authenticate(username, password)
        },
        value: currentData.password,
      }),
    ]).run()

    if (newData) {
      await getKeyTar().setPassword('vscode-grammarly', newData.username, newData.password)
      window.showInformationMessage(`Logged in to grammarly.com as ${newData.username}.`)
    }
  }
}
