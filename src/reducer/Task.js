export const taskReducer = (tasks, action) => {
  switch (action.type) {
    case "CREATE_TASK": {
      const task = {
        id: Date.now(),
        title: action.payload.title,
        boardId: action.payload.boardId,
        taskListId: action.payload.taskListId,
      };
      return [...tasks, task];
    }
    case "UPDATE_TASK": {
      return tasks.map((task) => {
        if(task.id === action.payload.id){
          task.title = action.payload.title || task.title
        }
        return task
      })
    }
    case "DELETE_TASK": {
      return tasks.filter(task => task.id !== action.payload.id)
    }
    case "CHANGE_BOARD_ID_OF_TASK" :{
      return tasks.map((task) => {
        if(task.id === action.payload.id) {
          task.boardId = action.payload.boardId;
        }
        return task
      })
    }
    case "CHANGE_TASKLIST_ID_OF_TASK" :{
      return tasks.map((task) => {
        if(task.id === action.payload.id) {
          task.taskListId = action.payload.taskListId;
        }
        return task
      })
    }
    default: {
      return tasks;
    }
  }
};
