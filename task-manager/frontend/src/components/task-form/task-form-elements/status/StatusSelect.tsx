import React from 'react';
import './StatusSelect';
import { TaskStatus } from '../../../../types/task';

interface StatusSelectProps {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
  return (
    <div className="status-select">
      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={value}
        onChange={(e) => onChange(e.target.value as TaskStatus)}
        required
      >
        <option value={TaskStatus.TODO}>To Do</option>
        <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
        <option value={TaskStatus.DONE}>Done</option>
      </select>
    </div>
  );
};

export default StatusSelect;
