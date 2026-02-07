import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  comparePassword,
  generateToken,
  hashPassword,
  TokenResult,
} from 'src/utils/index';
import { Prisma, User } from 'src/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get user by unique field
  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) {
      throw new NotFoundException('User not found');
      // throwNotFound('User not found');
    }

    return user;
  }

  // Create User
  async createUser(data: {
    email: string;
    name?: string;
    password: string;
  }): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hashPassword(data.password);

    return await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });
  }

  // Validate user (Login)
  async validateUser(data: {
    email: string;
    password: string;
  }): Promise<TokenResult> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password', {
        cause: new Error(),
        description: 'False email or password',
      });
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password', {
        cause: new Error(),
        description: 'False email or password',
      });
    }

    const token = generateToken({ userId: user.id, email: user.email });
    return token;
  }

  // Update User
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const existingUser = await this.prisma.user.findUnique({ where });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where,
      data,
    });
  }

  // Delete User
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where,
    });
  }
}
