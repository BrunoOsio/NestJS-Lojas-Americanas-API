import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto):Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll():Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("paginated")
  findAllPaginated(@Query("page") page: number):Promise<User[]> {
    return this.userService.findAllPaginated(page);
  }

  @Get(':id')
  //TODO verificar se dá pra melhorar o parseIntPipe para nao precisar escrever
  findOne(@Param('id', ParseIntPipe) id: string): Promise<User> { 
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.userService.remove(+id);
  }

  @Delete("dev/removeAll")
  removeAll(): Promise<void> {
    return this.userService.removeAll();
  }
}
