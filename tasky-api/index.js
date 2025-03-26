import dotenv from 'dotenv';
import express from 'express';
import tasksRouter from './api/task';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use('/api/tasks', tasksRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
