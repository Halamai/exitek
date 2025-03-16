import axios from 'axios';
import { Task } from '../types/task';
import { API_URL } from '../constants/constants';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}/tasks`);
  return response.data;
};

export const fetchTaskById = async (id: string): Promise<Task> => {
  const response = await axios.get<Task>(`${API_URL}/tasks/${id}`);
  return response.data;
};

export const createTask = async (
  task: Omit<Task, 'id' | 'subtasks' | 'createdAt'>
): Promise<Task> => {
  const response = await axios.post<Task>(`${API_URL}/tasks`, task);
  return response.data;
};

export const createSubtask = async (
  parentId: string,
  subtask: Omit<Task, 'id' | 'subtasks' | 'createdAt'>
): Promise<Task> => {
  const response = await axios.post<Task>(
    `${API_URL}/tasks/${parentId}/subtasks`,
    subtask
  );
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
): Promise<Task> => {
  const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, data);
  return response.data;
};
