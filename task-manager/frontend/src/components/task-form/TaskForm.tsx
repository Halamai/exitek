import { useState } from 'react';
import { Task, TaskStatus } from '../../types/task';
import './TaskForm.css';
import Button from '../task-form/task-form-elements/button/Button';
import StatusSelect from '../task-form/task-form-elements/status/StatusSelect';
import TitleInput from '../task-form/task-form-elements/title/TitleInput';
import DescriptionTextarea from '../task-form/task-form-elements/description/DescriptionTextarea';
import {
  createTask,
  createSubtask,
  updateTask,
} from '../../fetch-data/fetchTask';

interface TaskFormProps {
  task?: Task | null;
  subTasks?: Task[] | null;
  onClose: () => void;
  onTaskSaved: () => void;
  isSubtask?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  subTasks,
  onClose,
  onTaskSaved,
  isSubtask,
}) => {
  const [title, setTitle] = useState(!isSubtask && task ? task.title : '');
  const [description, setDescription] = useState(
    !isSubtask && task ? (task.description ?? '') : ''
  );
  const [status, setStatus] = useState<TaskStatus>(
    task ? (task.status as TaskStatus) : TaskStatus.TODO
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (task && !isSubtask) {
        await updateTask(task.id, { title, description, status });
      } else if (isSubtask && task) {
        await createSubtask(task.id, { title, description, status });
      } else {
        await createTask({ title, description, status });
      }

      onTaskSaved();
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <p>{isSubtask ? 'Create Subtask' : task ? 'Edit Task' : 'New Task'}</p>
        <form onSubmit={handleSubmit}>
          <TitleInput value={title} onChange={setTitle} />
          <DescriptionTextarea value={description} onChange={setDescription} />
          <StatusSelect value={status} onChange={setStatus} />

          {subTasks && subTasks.length > 0 && (
            <div className="subtasks-list">
              <h3>Subtasks:</h3>
              <ul>
                {subTasks.map((subtask) => (
                  <li key={subtask.id}>{subtask.title}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="task-form-actions">
            <Button
              label="Save"
              type="submit"
              isLoading={loading}
              variant="primary"
            />
            <Button label="Cancel" onClick={onClose} variant="secondary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
