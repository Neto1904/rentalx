import { SES } from 'aws-sdk'
import filesystem from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'
import { injectable } from 'tsyringe'

import { IMailProvider } from '../IMailProvider'

@injectable()
export class SESMailPRovider implements IMailProvider {
  private client: Transporter

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: 'sa-east-1',
      }),
    })
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateContent = filesystem.readFileSync(path).toString('utf-8')

    const templateParse = handlebars.compile(templateContent)

    const templateHTML = templateParse(variables)

    await this.client.sendMail({
      to,
      from: 'Rentx <hildebrando@hildebrandoneto.com>',
      subject,
      html: templateHTML,
    })
  }
}
