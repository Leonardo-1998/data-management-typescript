import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';
import { comparePassword, hashPassword } from 'src/utils/index';
import { throwNotFound, throwConflict, throwBadRequest } from 'src/common';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Get user by unique field
  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (!user) {
      throwNotFound('User not found');
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
      throwConflict('Email already exists');
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
  async validateUser(data: { email: string; password: string }): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throwBadRequest('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      throwBadRequest('Invalid email or password');
    }

    return user;
  }

  // Update User
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    const existingUser = await this.prisma.user.findUnique({ where });

    if (!existingUser) {
      throwNotFound('User not found');
    }

    return this.prisma.user.update({
      data,
      where,
    });
  }

  // Delete User
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where });

    if (!existingUser) {
      throwNotFound('User not found');
    }

    return this.prisma.user.delete({
      where,
    });
  }
}
