import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryNotFoundException } from './exception/category-not-found.exception';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(newCategory);

    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneOrFail(id);

    return category;
  }

  async findByIds(categoriesIdArray: number[]): Promise<Category[]> {
    let categories = [];

    for (let id of categoriesIdArray) {
      const found = await this.findOne(id);

      if (found) categories.push(found);
    }
    
    return categories;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    this.categoryRepository.update(id, updateCategoryDto);
    
    const updatedCategory = await this.findOne(id);

    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);
  }

  async removeAll(): Promise<void> {
    const allCategories = await this.findAll();

    await this.categoryRepository.remove(allCategories);
  }
}
