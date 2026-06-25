import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // 🔥 FIXED CREATE METHOD
  create(title: string, userId: number): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      completed: false,
      userId,
    });

    return this.taskRepository.save(task);
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async update(id: number, completed: boolean): Promise<Task | null> {
    await this.taskRepository.update(id, { completed });
    return this.findOne(id);
  }

  findByUser(userId: number) {
    return this.taskRepository.find({
      where: { userId },
    });
  }
}