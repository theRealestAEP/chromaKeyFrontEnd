// tasksContext.js
import { createContext } from 'react';

const TasksContext = createContext({
  tasks: [],
  addTask: (task: any) => {},
  updateTask: (taskId: string, status: string) => {}
});

export default TasksContext;
