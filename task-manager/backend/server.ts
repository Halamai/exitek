import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import sequelize from './config/database';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', taskRoutes);

sequelize.sync().then(() => {
  console.log('Database connected and synchronized.');
  app.listen(5000, () => console.log('Server running on port 5000'));
});

export default app;