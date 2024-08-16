import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import { json } from 'body-parser';
import userRouter from './routes/userRouter';
import errorHandler from './middlewares/errorHandler';
import cors from 'cors';

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:4200',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  
}));

app.use(json());

app.use('/users', userRouter);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
