import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('login')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return 'ok';
  }
}
