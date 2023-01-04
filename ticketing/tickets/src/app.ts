import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFound, currentUser } from '@imgtickets/common';
import { createTicketRouter } from './routes/new';
import morgan from 'morgan';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(morgan('dev'));
app.use(currentUser);

app.use(createTicketRouter);

app.all('*', () => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };
