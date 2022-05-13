import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.create(createUserDto);

    await this.save(newUser);

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.find();

    return users;
  }

  async findById(id: number): Promise<User> {
    const user = await this.findOneOrFail(id);

    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.update(id, updateUserDto);

    const updatedUser = await this.findOne(id);

    return updatedUser;
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.findOne(id);

    await this.remove(user);
  }

  async removeAllUsers(): Promise<void> {    
    const allUsers = await this.findAll();
    
    await this.remove(allUsers);
  }


};