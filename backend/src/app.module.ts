import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ChaptersModule } from './chapters/chapter.module';


import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PracticeModule } from './practice/practice.module';

@Module({
  imports: [
   ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI ?? (() => { throw new Error('MONGO_URI is not defined'); })()),
    UsersModule,
    AuthModule,
    ChaptersModule, 
    PracticeModule

  ],
})
export class AppModule {}
