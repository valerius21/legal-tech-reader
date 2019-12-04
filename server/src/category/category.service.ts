import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  public async getAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({ order: { name: 'ASC' } });
  }

  public async getCategory(id: string): Promise<Category> {
    return this.categoryRepository.findOneOrFail(id);
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  public async createCategory(data: CreateCategoryDto): Promise<Category> {
    const result = await this.categoryRepository.insert(data);
    return this.getCategory(result.raw[0].id);
  }

  public async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, data);
    return this.getCategory(id);
  }
}