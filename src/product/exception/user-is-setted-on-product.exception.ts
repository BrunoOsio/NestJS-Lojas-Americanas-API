import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";

export class UserIsSettedOnProductException extends BadRequestException {
  constructor(userId?: number, productId?: number) {
    
    const message = !isNaN(userId) && !isNaN(productId) ?
      `User with id #${userId} already setted on product id #${productId}` :
      "User already setted on product";

    super(message);
  }
}