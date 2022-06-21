import { createContext, useReducer } from "react";
import { taskListReducer } from "../reducer/TaskList";

export const TaskListContext = createContext();

const TaskListProvider = ({children}) => {

  const [taskLists,dispatchTaskListAction] =useReducer(taskListReducer,[])

  return(
    <TaskListContext.Provider value = {{taskLists,dispatchTaskListAction}} > 
      {children}
    </TaskListContext.Provider>
  )

}
export default TaskListProvider;