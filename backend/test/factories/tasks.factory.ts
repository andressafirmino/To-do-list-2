import { PrismaService } from '../../src/prisma/prisma.service';

export class TasksFactory {
  private name: string;
  private isFinished: boolean;

  constructor(private readonly prisma: PrismaService) {}

  newName(name: string) {
    this.name = name;
    return this;
  }
  newIsFinished(isFinished: boolean) {
    this.isFinished = isFinished;
    return this;
  }

  build() {
    return {
      name: this.name,
      isFinished: this.isFinished,
    };
  }

  async persist() {
    const task = this.build();
    return await this.prisma.task.create({
      data: task,
    });
  }
}
