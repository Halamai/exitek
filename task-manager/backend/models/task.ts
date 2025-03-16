import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

interface TaskAttributes {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  createdAt: Date;
  parentId?: string | null;
  subtasks?: Task[];
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "id" | "createdAt" | "subtasks"> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public status!: "todo" | "in-progress" | "done";
  public createdAt!: Date;
  public parentId?: string | null;
  public subtasks?: Task[]; 
}

Task.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("todo", "in-progress", "done"),
      allowNull: false,
      validate: {
        isIn: {
          args: [["todo", "in-progress", "done"]],
          msg: "Status must be one of: 'todo', 'in-progress', 'done'",
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    parentId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tasks",
  }
);

Task.hasMany(Task, { as: "subtasks", foreignKey: "parentId" });
Task.belongsTo(Task, { as: "parent", foreignKey: "parentId" });

export default Task;
