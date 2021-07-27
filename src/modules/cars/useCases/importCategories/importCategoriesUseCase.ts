import csvParse from 'csv-parse'
import { Express } from 'express'
import fs from 'fs'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = []
      const readStream = fs.createReadStream(file.path)
      const parser = csvParse()
      readStream.pipe(parser)
      parser
        .on('data', async (line) => {
          const [name, description] = line
          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', (error) => {
          reject(error)
        })
    })
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)
    categories.map(async (category) => {
      const { name, description } = category
      const existsCategory = this.categoriesRepository.findByName(name)
      if (!existsCategory) {
        this.categoriesRepository.create({ name, description })
      }
    })
  }
}

export { ImportCategoriesUseCase }
