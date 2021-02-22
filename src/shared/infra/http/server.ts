import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import '@shared/infra/typeorm';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import '@shared/container/';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
