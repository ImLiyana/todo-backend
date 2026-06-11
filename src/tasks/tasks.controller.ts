import { Controller, Get, Post, Body, Param,Delete,Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.findAll();
  }
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Post()
  createTask(@Body() body: { title: string }) {
    return this.tasksService.create(body.title);
  }
  @Delete(':id')
deleteTask(@Param('id') id: string) {
  return this.tasksService.delete(Number(id));
}
@Patch(':id')
updateTask(
  @Param('id') id: string,
  @Body() body: any,
) {
  console.log(body);

  return this.tasksService.update(
    Number(id),
    body.completed,
  );
}
}