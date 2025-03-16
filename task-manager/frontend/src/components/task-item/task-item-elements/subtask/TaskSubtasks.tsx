import React from 'react';
import { Task } from '../../../../types/task';
import './TaskSubtasks.css';

interface TaskSubtasksProps {
  task: Task;
  onAddSubtask: (e: React.MouseEvent) => void;
}

const TaskSubtasks: React.FC<TaskSubtasksProps> = ({ task, onAddSubtask }) => {
  return (
    <div className="subtasks">
      <div className="subtasks-info">
        <p>Subtasks: {task.subtasks?.length || 0}</p>
      </div>
      <button className="add-subtask-btn" onClick={onAddSubtask}>
        + Add Subtask
      </button>
    </div>
  );
};

export default TaskSubtasks;
