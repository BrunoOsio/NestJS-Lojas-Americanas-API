import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AddUserToProductDto } from './dto/add-user-to-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { RemoveUserToProductDto } from './dto/remove-user-to-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { UserIsNullOnProductException } from './exception/user-is-null-on-product.exception';
import { UserIsSettedOnProductException } from './exception/user-is-setted-on-product.exception';

@Injectable()
export class ProductService {

  private readonly PRODUCT_RELATIONS = {relations: ["owner"]};

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,

    private readonly userService: UserService
  ) {}

  async create(
    createProductDto: CreateProductDto, 
    userId?: number
  ): Promise<Product> {
    const newProduct = await this.productRepository.create(createProductDto);

    if(userId) {
      const user = await this.userService.findOne(userId);

      newProduct.owner = user;
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

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOneOrFail(id, this.PRODUCT_RELATIONS);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.productRepository.update(id, updateProductDto);

    const updatedProduct = await this.findOne(id);

    return updatedProduct;
  }

  async addUser(addUserToProductDto: AddUserToProductDto): Promise<Product> {
    const userId = addUserToProductDto.userId;
    const productId = addUserToProductDto.productId;

    const user = await this.userService.findOne(userId);

    const updatedProduct = await this.findOne(productId);

    if (updatedProduct.owner) throw new UserIsSettedOnProductException(userId, productId);

    updatedProduct.owner = user;

    await this.update(productId, updatedProduct);

    return updatedProduct;
  }

  async removeUser(removeUserToProductDto: RemoveUserToProductDto): Promise<Product> {
    const productId = removeUserToProductDto.productId;

    const updatedProduct = await this.findOne(productId);

    if(!updatedProduct.owner) throw new UserIsNullOnProductException(productId);
    
    updatedProduct.owner = null;

    await this.update(productId, updatedProduct);

    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);
  }

  async removeAll(): Promise<void> {    
    const allProducts = await this.findAllRaw();
    
    await this.productRepository.remove(allProducts);
  }
}
