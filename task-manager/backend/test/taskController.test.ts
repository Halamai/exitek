import request from 'supertest';
import app from '../server';
import  sequelize  from '../config/database';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Task API Endpoints', () => {
  let taskId: string;
  let subtaskId: string;

  it('should create a new task', async () => {
    const res = await request(app).post('/api/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
      status: 'todo',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');

    taskId = res.body.id;
  });

  it('should fetch all tasks', async () => {
    const res = await request(app).get('/api/tasks');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update a task', async () => {
    const res = await request(app).put(`/api/tasks/${taskId}`).send({
      title: 'Updated Task',
      status: 'in-progress',
    });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Task');
  });

  it('should create a subtask', async () => {
    const res = await request(app).post(`/api/tasks/${taskId}/subtasks`).send({
      title: 'Test Subtask',
      status: 'todo',
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.parentId).toBe(taskId);

    subtaskId = res.body.id;
  });

  it('should delete a task', async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Task and its subtasks deleted successfully');
  });
});
