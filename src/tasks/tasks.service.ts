import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDTO } from './dto/create-task-.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        t => t.title.includes(search) || t.description.includes(search),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const [task, _] = this.findTaskById(id);
    return { ...task };
  }

  createTask(createTaskDTO: CreateTaskDTO) {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string) {
    const [task, taskIndex] = this.findTaskById(id);
    this.tasks.splice(taskIndex, 1);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const [task, _] = this.findTaskById(id);
    task.status = status;
    return { ...task };
  }

  private findTaskById(id: string): [Task, number] {
    const taskIndex = this.tasks.findIndex(t => t.id === id);
    const task = this.tasks[taskIndex];
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return [task, taskIndex];
  }
}
