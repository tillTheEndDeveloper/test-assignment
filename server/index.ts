import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { json } from 'body-parser';
import userRouter from './routes/userRouter';
import errorHandler from './middlewares/errorHandler';
import cors, { CorsOptions } from 'cors';

dotenv.config();

const app: Application = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : [];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin || '') !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(json());

app.use('/users', userRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
