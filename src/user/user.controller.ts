import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { successResponse } from 'src/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register
  @Post('register')
  async register(
    @Body() data: { email: string; name?: string; password: string },
  ) {
    const user = await this.userService.createUser(data);

    return successResponse(user, 'Login successful');
  }

  // Login
  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    const user = await this.userService.validateUser(data);
    const { password, ...userWithoutPassword } = user;

    return successResponse(userWithoutPassword, 'Login successful');
  }

  // @Get()readonly
  // getHello(): string {
  //   return this.usersService.getHello();
  // }
}
