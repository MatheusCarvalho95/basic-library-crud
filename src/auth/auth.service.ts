import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { IAuthPayload } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    let checkPass = false;
    if (user) checkPass = await bcrypt.compare(password, user.password);
    if (!user || !checkPass) {
      return null;
    }

    delete user.password;
    return user;
  }

  async login(user: User) {
    const payload: IAuthPayload = {
      name: user.name,
      sub: user.id,
      role: user.role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async checkRole(requestedRole: string, uuid: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id: uuid } });
    if (!user || requestedRole !== user.role) throw new UnauthorizedException();
    return true;
  }
}
