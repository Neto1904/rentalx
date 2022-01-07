import { container } from 'tsyringe'

import { IDateProvider } from './dateProvider/IDateProvider'
import { DayJsDateProvider } from './dateProvider/implementations/DayJsDateProvider'
import { IMailProvider } from './mailProvider/IMailProvider'
import { EtherealMailProvider } from './mailProvider/implementations/EtherealMailProvider'
import { SESMailPRovider } from './mailProvider/implementations/SESMailProvider'
import { LocalStorageProvider } from './storageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './storageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './storageProvider/IStorageProvider'

container.registerSingleton<IDateProvider>('DateProvider', DayJsDateProvider)

const mailProvider = {
  eteheral: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailPRovider),
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER]
)

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  diskStorage[process.env.DISK]
)
