import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedCategoryOnProductException extends BadRequestException {
  constructor(categoryId?: number, productId?: number) {
    const message =
      !isNaN(categoryId) && !isNaN(productId)
        ? `Category with id #${categoryId} is duplicated on product id #${productId}`
        : 'Category is duplicated on product';

    super(message);
  }
}
