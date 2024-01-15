# To do list
This is a web application for task management.


# Demo
[https://github.com/andressafirmino/To-do-list]()


# How does it work?
This is a web application for task management. It has a single entity: `tasks`.

For the `tasks` entity, four routes were created:

- POST `/tarefas`: Register a new task.
- GET `/tarefas`: Get the to-do list.
- PUT `/tarefas/:id`: Update a task by id.
- DELETE `/tarefas:id`: Delete a task by id.

# Motivation
This project is a REST API that uses the Node and NestJS ecosystem along with TypeScript and Prisma technologies. The same project is part of a technical assessment for a selection process.

# Technologies used
For this project, the following were used:

- Node;
- NestJS;
- TypeScript;
- Prisma;
- MongoDB;

# How to run in development
To run this project under development, you need to follow the steps below:

- Clone the repository;
- Download the necessary dependencies with the command: `npm install`;
- Then create the `.env` file based on `.env.example`;
- This `.env` file is composed of the following property:
```
- DATABASE_URL="mongodb://username:password@..."
```
- The `DATABASE_URL` property is used to connect to the database.

- You will need to run Prisma to create the necessary database. To do this, run the command: `npx prisma generate`;
- To run the project under development, run the command `npm run start:dev`;

# How to run the tests

- Then create the `.env.test` file based on `.env.example`;
- This `.env.test` file is composed of the following property:
```
- DATABASE_URL="mongodb://username:password@..."
```
- The `DATABASE_URL` property is used to connect to the test database.

- You will need to run Prisma to create the necessary database. To do this, run the command: `npm run test:prisma`;
- To run the project under development, run the command `npm run start:dev`;
- To run the project's tests, open another terminal and run the command `npm run test:e2e`;

# Continuity plan
- Implement task priority;
- Implement task size;
- Implement tasks with date or day;
- Implement daily tasks (routine system);
- Implement daily task filter;

