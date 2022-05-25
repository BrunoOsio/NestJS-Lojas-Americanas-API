import { HttpException, HttpStatus } from "@nestjs/common";

export class UserIsNullOnProductException extends HttpException {
  constructor(productId?: number) {
    
    const message = !isNaN(productId) ?
      `User is already null on product id #${productId}` :
      "User is null on product";

    super(message, HttpStatus.BAD_REQUEST);
  }
}