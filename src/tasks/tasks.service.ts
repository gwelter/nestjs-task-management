import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task-.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // getAllTasks() {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(t => t.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       t => t.title.includes(search) || t.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }
  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }
  // deleteTask(id: string) {
  //   const [task, taskIndex] = this.findTaskById(id);
  //   this.tasks.splice(taskIndex, 1);
  //   return task;
  // }
  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const [task, _] = this.findTaskById(id);
  //   task.status = status;
  //   return { ...task };
  // }
  // private findTaskById(id: string): [Task, number] {
  //   const taskIndex = this.tasks.findIndex(t => t.id === id);
  //   const task = this.tasks[taskIndex];
  //   if (!task) {
  //     throw new NotFoundException('Task not found');
  //   }
  //   return [task, taskIndex];
  // }
}
