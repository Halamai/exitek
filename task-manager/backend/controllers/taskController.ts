import { Request, Response } from "express";
import { Op } from "sequelize"; 
import Task from "../models/task";
import { v4 as uuidv4 } from "uuid";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.findAll({
      where: {
        parentId: { [Op.eq]: null },
      },
      include: [
        {
          model: Task,
          as: "subtasks",
          include: [{ model: Task, as: "subtasks" }],
        },
      ],
    });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: Task, as: "subtasks" }],
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, status, parentId } = req.body;

    if (!title || !status) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    const newTask = await Task.create({
      id: uuidv4(),
      title,
      description,
      status,
      parentId: parentId || null,
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addSubtask = async (req: Request, res: Response): Promise<void> => {
  try {
    const parentTask = await Task.findByPk(req.params.id);

    if (!parentTask) {
      res.status(404).json({ error: "Parent task not found" });
      return;
    }

    const { title, description, status } = req.body;
    if (!title || !status) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    const subtask = await Task.create({
      id: uuidv4(),
      title,
      description,
      status,
      parentId: parentTask.id, 
    });

    res.status(201).json(subtask);
  } catch (error) {
    console.error("Error adding subtask:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: Task, as: "subtasks" }],
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    if (task.subtasks && task.subtasks.length > 0) {
      await Task.destroy({ where: { parentId: task.id } });
    }

    await task.destroy();
    res.json({ message: "Task and its subtasks deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    await Task.destroy({ where: {} });
    res.json({ message: "All tasks deleted successfully" });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
