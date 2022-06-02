import { Category } from "src/category/entities/category.entity";
import { User } from "../../user/entities/user.entity";

export class CreateProductDto {
  name: string;
  owner?: User;
  categoriesId?: number[];
}
