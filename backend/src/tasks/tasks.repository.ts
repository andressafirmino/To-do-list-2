import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.prisma.task.create({ data: createTaskDto });
  }

  async findAllTasks() {
    return await this.prisma.task.findMany();
  }

  async findTaskByName(name: string) {
    return await this.prisma.task.findUnique({ where: { name } });
  }

  async findTaskById(id: string) {
    return await this.prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async deleteTask(id: string) {
    return await this.prisma.task.delete({ where: { id } });
  }
}
