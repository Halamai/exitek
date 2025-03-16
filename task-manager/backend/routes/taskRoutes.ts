import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  addSubtask, // ✅ Новий ендпоінт
} from "../controllers/taskController";

const router = express.Router();

router.get("/tasks", getTasks); // Отримати всі задачі (з підзадачами)
router.get("/tasks/:id", getTaskById); // Отримати конкретну задачу
router.post("/tasks", createTask); // Створити задачу
router.put("/tasks/:id", updateTask); // Оновити задачу
router.delete("/tasks/:id", deleteTask); // Видалити задачу
router.delete("/tasks", deleteAllTasks); // Видалити всі задачі

router.post("/tasks/:id/subtasks", addSubtask); // ✅ Додати підзадачу до існуючого завдання


export default router;
