import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import mockUserService from './mock/user.controller.mock';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';


describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
    .overrideProvider(UserService)
    .useValue(mockUserService)
    .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should create a user", async() => {
    const user: CreateUserDto = {
      name: "test",
      age: 10
    }

    const result = await controller.create(user);

    expect(result).toEqual({
      id: expect.any(Number),
      ...user
    });

    expect(mockUserService.create).toHaveBeenCalledWith(user);
  });

  it("should update a user", async() => {
    const dto: UpdateUserDto = {
      name: "test",
      age: 10
    }

    const id = "68";

    expect(await controller.update(id, dto)).toEqual({
      id: Number(id),
      ...dto
    });

    expect(mockUserService.update).toHaveBeenCalled();
  })

  //TODO MUDAR PQ NAO FUNCIONA
  it("should find a user by id", async () => {
    const id = "68";

    expect(await controller.findOne(id)).toBe(User);
  })
});
