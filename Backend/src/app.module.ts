import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PrismaModule, UsersModule, PostModule, ConfigModule.forRoot()],
})
export class AppModule {}
