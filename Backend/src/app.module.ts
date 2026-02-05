import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UsersModule, ConfigModule.forRoot()],
})
export class AppModule {}
