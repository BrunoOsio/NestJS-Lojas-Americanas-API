import { Product } from "../../product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToMany(
    () => Product, 
    product => product.owner,
    { onDelete: "SET NULL" }
  )
  products: Product[];
}
