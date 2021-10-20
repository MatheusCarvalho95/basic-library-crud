import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async create(createUserRequest: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      where: { email: createUserRequest.email },
    });

    if (userExists) {
      throw new ConflictException(
        `An user with email: ${createUserRequest.email} already exists.`,
      );
    }
    const newUser = this.userRepository.create(createUserRequest);
    const user = await this.userRepository.save(newUser);
    delete user.password;
    return user;
  }
}
