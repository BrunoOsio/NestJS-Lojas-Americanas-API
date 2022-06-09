import { BadRequestException } from '@nestjs/common';

export class CategoryAmountExccededException extends BadRequestException {
  constructor(productId?: number) {
    const message =
      !isNaN(productId)
        ? `Product with id #${productId} reached the maximum amount of categories`
        : 'Product reached the maximum amount of categories';

    super(message);
  }
}