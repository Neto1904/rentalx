import filesystem from 'fs'
import { resolve } from 'path'

import upload from '@config/upload'

import { IStorageProvider } from '../IStorageProvider'

export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    filesystem.promises.rename(
      resolve(upload.folder, file),
      resolve(`${upload.folder}/${folder}`, file)
    )

    return file
  }
  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${upload.folder}/${folder}`, file)
    try {
      await filesystem.promises.stat(fileName)
    } catch (error) {
      return
    }
    await filesystem.promises.unlink(fileName)
  }
}
