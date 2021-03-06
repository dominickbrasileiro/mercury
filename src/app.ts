import 'express-async-errors';
import 'reflect-metadata';
import 'dotenv/config';
import './container';

import express, { NextFunction, Request, Response } from 'express';
import { IAppError } from './protocols/app-error-protocol';
import { routes } from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.use(
  (
    err: Error | IAppError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (err instanceof Error) {
      console.log(err);
      return res.status(500).json({
        error: 'InternalServerError',
        message: 'An internal server error occurred. Please try again later.',
      });
    }

    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  },
);

export { app };
