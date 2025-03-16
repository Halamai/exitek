import React from 'react';
import './TaskActions.css';

interface TaskActionsProps {
  onEdit: () => void;
  onDelete: (e: React.MouseEvent) => void;
  isDeleting: boolean;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  onEdit,
  onDelete,
  isDeleting,
}) => {
  return (
    <div className="task-actions">
      <button className="edit-task-btn" onClick={onEdit}>
        ✏ Edit
      </button>
      <button
        className="delete-task-btn"
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : '🗑 Delete'}
      </button>
    </div>
  );
};

export default TaskActions;
