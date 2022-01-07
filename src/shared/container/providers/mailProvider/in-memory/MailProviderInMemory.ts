import { IMailProvider } from '../IMailProvider'

class MailProviderInMemory implements IMailProvider {
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    console.log('Mail sent to ' + to)
    console.log('Subject: ' + subject)
    console.log('Variables: ' + variables)
    console.log('Path: ' + path)
  }
}

export { MailProviderInMemory }
