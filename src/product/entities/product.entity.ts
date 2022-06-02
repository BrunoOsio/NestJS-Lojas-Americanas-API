import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "src/category/entities/category.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    () => User,
    user => user.products,
    { onDelete: "SET NULL" }
  )
  owner: User;

  @ManyToMany(
    () => Category, 
    category => category.products
  )
  @JoinTable({name: "product_category"})
  categories: Category[];
}
