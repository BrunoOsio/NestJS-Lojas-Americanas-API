import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddUserToProductDto } from './dto/add-user-to-product.dto';
import { Product } from './entities/product.entity';
import { RemoveUserToProductDto } from './dto/remove-user-to-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Query("userId") userId?: number
  ): Promise<Product> {
    return this.productService.create(createProductDto, userId);
  }

  @Get()
  findAll(): Promise<Product[]>{
    return this.productService.findAll();
  }

  @Get("raw")
  findAllRaw(): Promise<Product[]>{
    return this.productService.findAllRaw();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productService.update(+id, updateProductDto);
  }

  @Post("addUser")
  addUser(
    @Body() addUserToProduct: AddUserToProductDto,
  ): Promise<Product> {

    return this.productService.addUser(addUserToProduct);
  }

  @Post("removeUser")
  removeUser(@Body() removeUserToProductDto: RemoveUserToProductDto): Promise<Product> {
    return this.productService.removeUser(removeUserToProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(+id);
  }

  @Delete("/dev/removeAll")
  removeAll(): Promise<void> {
    return this.productService.removeAll();
  }
}
