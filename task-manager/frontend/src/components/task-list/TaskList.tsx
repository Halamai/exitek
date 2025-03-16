import React, { useEffect, useState } from 'react';
import TaskItem from '../task-item/TaskItem';
import { Task } from '../../types/task';
import './TaskList.css';
import AddTaskButton from '../add-task-button/AddTaskButton';
import TaskForm from '../task-form/TaskForm';
import { fetchTasks } from '../../fetch-data/fetchTask';

const TaskList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="task-list-container">
      <div className="task-list">
        <AddTaskButton onClick={() => setIsFormOpen(true)} />
        {tasks.map((task) => (
          <TaskItem key={task.id} taskId={task.id} onTaskSaved={loadTasks} />
        ))}
      </div>

      {isFormOpen && (
        <TaskForm
          onClose={() => setIsFormOpen(false)}
          onTaskSaved={() => {
            loadTasks();
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
