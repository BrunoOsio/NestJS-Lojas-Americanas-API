import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "../ormconfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UserModule, 
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
