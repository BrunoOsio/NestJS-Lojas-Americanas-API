import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Product]),
    
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
