import React from 'react';
import './AddTaskButton.css';

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => {
  return (
    <div className="task-card add-task" onClick={onClick}>
      <button className="plus-icon">+</button>
    </div>
  );
};

export default AddTaskButton;
