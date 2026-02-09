import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { successResponse } from '../common';
import { verifyAuthHeader } from '../utils';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from 'src/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);

    return successResponse(user, 'Register successful');
  }

  // Login
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.userService.validateUser(loginUserDto);

    return successResponse(token, 'Login successful');
  }

  // Get user profile
  @Get('profile')
  async getProfile(@Headers('authorization') authHeader: string) {
    const payload = verifyAuthHeader(authHeader);
    const user = await this.userService.user({ id: payload.userId });

    const { password, ...userWithOutPassword } = user;
    return successResponse(
      userWithOutPassword,
      'Profile retrieved successfully',
    );
  }

  // Get all user
  @Get('all')
  async getAllUser() {
    const users = await this.userService.allUser();

    const usersWithOutPassword = users.map((user) => {
      const { password, ...userWithOutPassword } = user;
      return { userWithOutPassword };
    });
    return successResponse(
      usersWithOutPassword,
      'Profile retrieved successfully',
    );
  }

  @Put('update')
  async updateProfile(
    @Headers('authorization') authHeader: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const payload = verifyAuthHeader(authHeader);

    const updateProfile = await this.userService.updateUser({
      where: { id: payload.userId },
      data: updateUserDto,
    });

    const { password, ...userWithOutPassword } = updateProfile;

    return successResponse(userWithOutPassword, 'Profile updated successfuly');
  }

  @Delete('delete')
  async deleteProfile(@Headers('authorization') authHeader: string) {
    const payload = verifyAuthHeader(authHeader);

    const deleteProfile = await this.userService.deleteUser({
      id: payload.userId,
    });

    const { password, ...userWithOutPassword } = deleteProfile;

    return successResponse(userWithOutPassword, 'Profile deleted successfuly');
  }
}
