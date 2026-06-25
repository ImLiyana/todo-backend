import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // 🔐 GET TASKS FOR LOGGED-IN USER
  @Get()
  getAllTasks(@CurrentUser() user: any) {
    return this.tasksService.findByUser(user.userId);
  }

  // 🔐 GET SINGLE TASK
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  // 🔐 CREATE TASK (ASSIGNED TO USER)
  @Post()
  createTask(
    @Body() body: { title: string },
    @CurrentUser() user: any,
  ) {
    return this.tasksService.create(body.title, user.userId);
  }

  // 🔐 DELETE TASK
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(Number(id));
  }

  // 🔐 UPDATE TASK
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(Number(id), body.completed);
  }
}