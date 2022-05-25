import { User } from "../../user/entities/user.entity";

export class CreateProductDto {
  name: string;
  owner?: User;
}
