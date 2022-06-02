import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UserIsNullOnProductException } from './exception/user-is-null-on-product.exception';
import { UserIsSettedOnProductException } from './exception/user-is-setted-on-product.exception';
import {
  FindProductOptions,
  ProductFindParameter,
} from './options/find-product.options';
import isSetted from '../shared/helpers/is-set.helper';
import normalizeString from 'src/shared/helpers/normalize-string.helper';
import appendTo from 'src/shared/helpers/append-to.helper';
import showTerminalQuery from 'src/shared/helpers/show-terminal-query.helper';
import { CategoryService } from 'src/category/category.service';
import { CategoryNotFoundOnProductException } from './exception/category-not-found-on-product.exception';
import { DuplicatedCategoryOnProductException } from './exception/category-is-setted-on-product.exception';
import { isDeepStrictEqual } from 'util';
import checkIfCategoryIsDuplicatedOnProduct from './helpers/check-if-category-is-duplicated-on-product.helper';

@Injectable()
export class ProductService {
  private readonly PRODUCT_RELATIONS = { relations: ['owner', 'categories'] };

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    userId?: number,
  ): Promise<Product> {
    const newProduct = await this.productRepository.create(createProductDto);
    newProduct.name = normalizeString(newProduct.name);

    if (userId) {
      const user = await this.userService.findOne(userId);

      newProduct.owner = user;
    }

    const categoriesIdArray = createProductDto.categoriesId;

    if (categoriesIdArray) {
      const categories = await this.categoryService.findByIds(
        categoriesIdArray,
      );

      newProduct.categories = [...categories];
    }

    await this.productRepository.save(newProduct);

    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find(this.PRODUCT_RELATIONS);

    return products;
  }

  async findAllRaw(): Promise<Product[]> {
    const products = await this.productRepository.find();

    return products;
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productRepository.findOneOrFail(
      id,
      this.PRODUCT_RELATIONS,
    );

    return product;
  }

  //TODO needs refactoration on query
  async findByQuery(options?: FindProductOptions): Promise<Product[]> {
    let query = { where: {} };

    const name =
      options && isSetted(options.name)
        ? options.name
        : ProductFindParameter.IS_NULL;

    const hasOwner =
      options && isSetted(options.hasOwner)
        ? options.hasOwner
        : ProductFindParameter.IS_NULL;

    const ownerId =
      options && isSetted(options.ownerId)
        ? options.ownerId
        : ProductFindParameter.IS_NULL;

    if (isSetted(name)) {
      query.where = appendTo(query.where, {
        name: normalizeString(name),
      });
    }

    if (isSetted(hasOwner)) {
      query.where = appendTo(query.where, {
        owner: hasOwner ? Not(IsNull()) : IsNull(),
      });
    }

    if (isSetted(ownerId)) {
      query.where = appendTo(query.where, {
        owner: { id: ownerId },
      });
    }

    showTerminalQuery(query);

    const product = await this.productRepository.find({
      ...query,
      ...this.PRODUCT_RELATIONS,
    });

    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);

    const updatedProduct = await this.findById(id);

    return updatedProduct;
  }

  async addUser(productId: number, userId: number): Promise<Product> {
    const updatedProduct = await this.findById(productId);

    if (updatedProduct.owner)
      throw new UserIsSettedOnProductException(userId, productId);

    const user = await this.userService.findOne(userId);
    updatedProduct.owner = user;

    await this.update(productId, updatedProduct);

    return updatedProduct;
  }

  async removeUser(productId: number): Promise<Product> {
    const updatedProduct = await this.findById(productId);

    if (!updatedProduct.owner)
      throw new UserIsNullOnProductException(productId);

    updatedProduct.owner = null;

    await this.update(productId, updatedProduct);

    return updatedProduct;
  }

  async addCategory(productId: number, categoryId: number): Promise<Product> {
    const updatedProduct = await this.findById(productId);

    const productCategories = updatedProduct.categories;
    const newCategory = await this.categoryService.findOne(categoryId);

    const isDuplicated = checkIfCategoryIsDuplicatedOnProduct(productCategories, newCategory);

    if (isDuplicated)
      throw new DuplicatedCategoryOnProductException(productId, categoryId);

    updatedProduct.categories.push(newCategory);

    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async removeCategory(productId: number, categoryId: number) {
    const updatedProduct = await this.findById(productId);

    const updatedCategories = updatedProduct.categories.filter(
      (category) => category.id != categoryId,
    );

    const categoriesLength = updatedProduct.categories.length;
    const updatedCategoriesLength = updatedCategories.length;

    if (categoriesLength === updatedCategoriesLength)
      throw new CategoryNotFoundOnProductException(categoryId, productId);

    updatedProduct.categories = [];
    updatedProduct.categories.push(...updatedCategories);

    await this.productRepository.save(updatedProduct);

    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findById(id);

    await this.productRepository.remove(product);
  }

  async removeAll(): Promise<void> {
    const allProducts = await this.findAllRaw();

    await this.productRepository.remove(allProducts);
  }
}
