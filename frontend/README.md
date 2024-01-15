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
This project is the frontend of a web application. It is part of a technical assessment for a selection process.

# Technologies used
For this project, the following were used:

- Node;
- NextJS;
- TypeScript;
- TailwindCSS;
- Axios.

# How to run in development
To run this project under development, you need to follow the steps below:

- Clone the repository;
- Download the necessary dependencies with the command: `npm install`;
- Then create the `.env` file based on `.env.example`;
- This `.env` file is composed of the following properties:
```
- NEXT_PUBLIC_DB_HOST="http://local..."
```
- To run the project under development, run the command `npm run dev`;


# Continuity plan
- Implement layout and features for task priority;
- Implement layout and features task size;
- Implement layout and features tasks with date or day;
- Implement layout and features daily tasks (routine system);
- Implement layout and features daily task filter;

