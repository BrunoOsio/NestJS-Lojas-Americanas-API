import { BadRequestException } from '@nestjs/common';

export class CategoryNotFoundOnProductException extends BadRequestException {
  constructor(categoryId?: number, productId?: number) {
    const message =
      !isNaN(categoryId) && !isNaN(productId)
        ? `Category with id #${categoryId} not found on product id #${productId}`
        : 'Category not found on product';

    super(message);
  }
}
