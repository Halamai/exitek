import { useState, useEffect } from 'react';
import { Task } from '../../types/task';
import './TaskItem.css';
import { formatDate } from '../../utils/dateFormatter';
import TaskForm from '../task-form/TaskForm';
import ReactDOM from 'react-dom';
import { fetchTaskById, deleteTask } from '../../fetch-data/fetchTask';
import TaskActions from './task-item-elements/action/TaskActions';
import TaskSubtasks from './task-item-elements/subtask/TaskSubtasks';

interface TaskItemProps {
  taskId: string;
  onTaskSaved: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ taskId, onTaskSaved }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isCreatingSubtask, setIsCreatingSubtask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      try {
        const data = await fetchTaskById(taskId);
        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskId, forceUpdate]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await deleteTask(taskId);
      onTaskSaved();
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <>
      <div className="task-card">
        <p>{task.title}</p>
        <span className={`status ${task.status}`}>{task.status}</span>
        <p>{task.description}</p>
        <p className="task-date">Date created: {formatDate(task.createdAt)}</p>

        <TaskSubtasks
          task={task}
          onAddSubtask={() => setIsCreatingSubtask(true)}
        />

        <TaskActions
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
          isDeleting={loading}
        />
      </div>

      {isCreatingSubtask &&
        ReactDOM.createPortal(
          <div>
            <div id="task-form">
              <TaskForm
                isSubtask={true}
                task={task}
                subTasks={task.subtasks || []}
                onClose={() => setIsCreatingSubtask(false)}
                onTaskSaved={() => {
                  setIsCreatingSubtask(false);
                  setForceUpdate((prev) => prev + 1);
                }}
              />
            </div>
          </div>,
          document.body
        )}

      {isEditing &&
        ReactDOM.createPortal(
          <div>
            <div id="task-form">
              <TaskForm
                isSubtask={false}
                task={task}
                subTasks={task.subtasks || []}
                onClose={() => setIsEditing(false)}
                onTaskSaved={() => {
                  setIsEditing(false);
                  setForceUpdate((prev) => prev + 1);
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default TaskItem;
