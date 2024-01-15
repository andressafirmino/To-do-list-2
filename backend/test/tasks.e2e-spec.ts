import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TasksFactory } from './factories/tasks.factory';
import { CreateTaskDto } from '../src/tasks/dto/create-task.dto';

describe('TasksController (e2e) tests', () => {
  let app: INestApplication;
  const prisma: PrismaService = new PrismaService();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    await prisma.task.deleteMany({});
  });

  afterAll(async () => {
    prisma.$disconnect();
  });

  describe('POST/tarefas', () => {
    it('should respond with status 409 when tasks already exists', async () => {
      await new TasksFactory(prisma).newName('study java').newIsFinished(false).persist();

      const task: CreateTaskDto = new CreateTaskDto({
        name: 'study java',
        isFinished: false,
      });
      await request(app.getHttpServer()).post('/tarefas').send(task).expect(HttpStatus.CONFLICT);
    });

    it('should respond with status 400 when name is invalid', async () => {
      const task: CreateTaskDto = new CreateTaskDto({
        name: 'st ',
        isFinished: false,
      });
      await request(app.getHttpServer()).post('/tarefas').send(task).expect(HttpStatus.BAD_REQUEST);
    });

    it('should respond with status 201 when task data is valid', async () => {
      const task: CreateTaskDto = new CreateTaskDto({
        name: 'study java',
        isFinished: false,
      });
      await request(app.getHttpServer()).post('/tarefas').send(task).expect(HttpStatus.CREATED);

      const tasks = await prisma.task.findMany();
      expect(tasks).toHaveLength(1);
      expect(tasks[0]).toEqual({
        id: expect.any(String),
        name: 'study java',
        isFinished: false,
      });
    });
  });

  describe('GET/tarefas', () => {
    it('should respond whith status 200 and get all tasks', async () => {
      await new TasksFactory(prisma).newName('study java').newIsFinished(false).persist();

      await new TasksFactory(prisma).newName('study docker').newIsFinished(false).persist();

      await request(app.getHttpServer()).get('/tarefas').expect(HttpStatus.OK);

      const tasks = await prisma.task.findMany();
      expect(tasks).toHaveLength(2);
      expect(tasks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            isFinished: expect.any(Boolean),
          }),
        ]),
      );
    });
  });

  describe('PUT/tarefas', () => {
    it('should respond with status 400 when name is invalid', async () => {
      const task: CreateTaskDto = new CreateTaskDto({
        name: 'st ',
        isFinished: false,
      });
      await request(app.getHttpServer()).put('/tarefas/2').send(task).expect(HttpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when id id is less than 24 characters', async () => {
      const task: CreateTaskDto = new CreateTaskDto({
        name: 'study java',
        isFinished: false,
      });
      await request(app.getHttpServer()).put('/tarefas/1').send(task).expect(HttpStatus.BAD_REQUEST);
    });

    it('should respond with status 404 when id does not exist', async () => {
      const task: CreateTaskDto = new CreateTaskDto({
        name: 'study java',
        isFinished: false,
      });
      await request(app.getHttpServer())
        .put('/tarefas/111111111111111111111111')
        .send(task)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('should respond with status 200 when task data is valid', async () => {
      const task = await new TasksFactory(prisma).newName('study java').newIsFinished(false).persist();

      const taskUpdate: CreateTaskDto = new CreateTaskDto({
        name: 'study java',
        isFinished: true,
      });
      await request(app.getHttpServer()).put(`/tarefas/${task.id}`).send(taskUpdate).expect(HttpStatus.OK);

      const updatedTask = await prisma.task.findUnique({ where: { id: task.id } });
      expect(updatedTask).toEqual({
        id: task.id,
        name: 'study java',
        isFinished: true,
      });
    });
  });

  describe('DELETE/tarefas', () => {
    it('should respond with status 400 when id id is less than 24 characters', async () => {
      await request(app.getHttpServer()).delete('/tarefas/1').expect(HttpStatus.BAD_REQUEST);
    });

    it('should respond with status 404 when id does not exist', async () => {
      await request(app.getHttpServer()).delete('/tarefas/111111111111111111111111').expect(HttpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and delete task by id', async () => {
      await new TasksFactory(prisma).newName('study docker').newIsFinished(false).persist();
      const task = await new TasksFactory(prisma).newName('study java').newIsFinished(false).persist();

      await request(app.getHttpServer()).delete(`/tarefas/${task.id}`).expect(HttpStatus.OK);

      const updatedTask = await prisma.task.findUnique({ where: { id: task.id } });
      expect(updatedTask).toEqual(null);
    });
  });
});
