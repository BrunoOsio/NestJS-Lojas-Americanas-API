import { NotFoundException } from "@nestjs/common";

export class CategoryNotFoundException extends NotFoundException {
  constructor(categoryId?: number) {
    
    const message = !isNaN(categoryId) ?
      `category id #${categoryId} not found` :
      "a category sent was not found";

    super(message);
  }
}