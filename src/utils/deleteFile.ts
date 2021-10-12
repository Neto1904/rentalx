import fs from 'fs'

export async function deleteFile(filePath: string): Promise<void> {
  try {
    await fs.promises.stat(filePath)
  } catch (error) {
    return
  }
  await fs.promises.unlink(filePath)
}
