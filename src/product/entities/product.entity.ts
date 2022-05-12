import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isBought: boolean;

  @ManyToOne(
    () => User,
    user => user.products,
    { onDelete: "CASCADE" } //TODO verificar se está correto. Testar com SET NULL
  )
  owner: User;
}
