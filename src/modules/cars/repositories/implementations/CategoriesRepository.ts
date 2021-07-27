import { Category } from '../../model/Category'
import { ICategoriesRepository } from '../ICategoriesRepository'

interface ICreateCategoryDTO {
  name: string
  description: string
}

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoriesRepository()
    }
    return this.INSTANCE
  }

  create({ name, description }: ICreateCategoryDTO): void {
    let category = new Category()
    category = {
      name,
      description,
      createdAt: new Date(),
      ...category,
    }
    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category {
    const category = this.categories.find((c) => c.name === name)
    return category
  }
}

export { CategoriesRepository }
