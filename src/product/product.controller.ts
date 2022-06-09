import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Query('userId') userId?: number,
  ): Promise<Product> {
    return this.productService.create(createProductDto, userId);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get("paginated")
  findAllPaginated(@Query("page") page: number): Promise<Product[]> {
    return this.productService.findAllPaginated(page);
  }

  @Get('raw')
  findAllRaw(): Promise<Product[]> {
    return this.productService.findAllRaw();
  }

  @Get('withOwners')
  findAllWithOwners(): Promise<Product[]> {
    return this.productService.findByQuery({ hasOwner: true });
  }

  @Get('withoutOwners')
  findAllWithoutOwners(): Promise<Product[]> {
    return this.productService.findByQuery({ hasOwner: false });
  }

  @Get('withCategories')
  findAllWithCategories() {
    return this.productService.findWithCategories();
  }

  @Get('withoutCategories')
  findAllWithoutCategories() {
    return this.productService.findWithoutCategories();
  }

  @Get("category/:id")
  findByCategory(@Param("id") id: number): Promise<Product[]> {
    return this.productService.findByCategory(id);
  }
  
  @Get(':id')
  findById(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(+id);
  }

  @Get('name/:name')
  findByName(@Param('name') name: string): Promise<Product[]> {
    return this.productService.findByQuery({ name: name, hasOwner: true });
  }

  @Get('owner/:id')
  findByOwner(@Param('id') id: number): Promise<Product[]> {
    return this.productService.findByQuery({ ownerId: id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(+id, updateProductDto);
  }

  @Patch('/:productId/addUser/:userId')
  addUser(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
  ): Promise<Product> {
    return this.productService.addUser(productId, userId);
  }

  @Patch('/:productId/removeUser')
  removeUser(@Param('productId') productId: number): Promise<Product> {
    return this.productService.removeUser(productId);
  }

  @Patch('/:productId/addCategory/:categoryId')
  addCategory(
    @Param('productId') productId: number,
    @Param('categoryId') categoryId: number,
  ): Promise<Product> {
    return this.productService.addCategory(productId, categoryId);
  }

  @Patch("/:productId/removeCategory/:categoryId")
  removeCategory(
    @Param('productId') productId: number,
    @Param('categoryId') categoryId: number
  ): Promise<Product> {
    return this.productService.removeCategory(productId, categoryId);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(+id);
  }

  @Delete('/dev/removeAll')
  removeAll(): Promise<void> {
    return this.productService.removeAll();
  }
}
