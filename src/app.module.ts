import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

import { Task } from './tasks/task.entity';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url:' postgresql://tasks_db_lci4_user:NpMmgTQBqhDa9qjwd8LvbQImIwF1XtKq@dpg-d8l9qhbeo5us73b89dng-a.singapore-postgres.render.com/tasks_db_lci4',
      entities: [Task, User],
      synchronize: false,
      ssl: {
        rejectUnauthorized: false,
      },
    }),

    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}