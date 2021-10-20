import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user || (await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Bad credentials');
    }

    delete user.password;
    return user;
  }
}
