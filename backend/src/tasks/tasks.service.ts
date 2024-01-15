import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  checkTaskData(taskData: CreateTaskDto) {
    const { name, isFinished } = taskData;
    if (name.trim().length < 3 || typeof isFinished !== 'boolean') throw new BadRequestException();
  }

  async findTaskByName(name: string) {
    const registeredName = await this.tasksRepository.findTaskByName(name);
    if (registeredName) throw new ConflictException('Task already registered');
  }

  async findTaskById(id: string) {
    if (id.length < 24) throw new BadRequestException('Id must have at least 24 characters');
    const task = await this.tasksRepository.findTaskById(id);
    if (!task) throw new NotFoundException('Task not found');
  }
  async createTask(createTaskDto: CreateTaskDto) {
    this.checkTaskData(createTaskDto);
    await this.findTaskByName(createTaskDto.name);
    return await this.tasksRepository.createTask(createTaskDto);
  }

  async findAllTasks() {
    return await this.tasksRepository.findAllTasks();
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    this.checkTaskData(updateTaskDto);
    await this.findTaskById(id);
    return await this.tasksRepository.updateTask(id, updateTaskDto);
  }

  async deleteTask(id: string) {
    await this.findTaskById(id);
    return await this.tasksRepository.deleteTask(id);
  }
}
