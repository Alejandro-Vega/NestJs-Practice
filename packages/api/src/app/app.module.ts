import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/user.entity';
import { TodoModule } from '../todo/todo.module';
import { TodoEntity } from '../todo/todo.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_TYPE,
      entities: [UserEntity, TodoEntity],
      synchronize: process.env.ENV === 'DEV'
    }),
    UserModule,
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
