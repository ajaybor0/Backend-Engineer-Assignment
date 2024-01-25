import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import subTaskRoutes from './routes/subTaskRoutes.js';
import startCronJobs from './jobs/cronJobs.js';
const port = process.env.PORT || 5000;
// Connect to MongoDB
connectDB();
// Start cron jobs
// startCronJobs(); //Remove comment to make call

const app = express();

app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/sub-tasks', subTaskRoutes);

//-------------------------------------
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
