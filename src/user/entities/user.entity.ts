import { Product } from "src/product/entities/product.entity";
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
    { onDelete: "CASCADE" } //TODO verificar se está correto. Testar com SET NULL
  )
  products: Product[];
}
