import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UsersModule],
})
export class AppModule {}
