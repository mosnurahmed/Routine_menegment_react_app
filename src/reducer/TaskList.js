export const taskListReducer = (taskLists, action) => {
  switch (action.type) {
    case "CREATE_TASKLIST": {
      const taskList = {
        id: action.payload.id,
        title: action.payload.title,
        tasks: [],
        boardId: action.payload.boardId,
      };
      return [...taskLists, taskList];
    }
    case "UPDATE_TASKLIST": {
      return taskLists.map((taskList) => {
        if (taskList.id === action.payload.id) {
          taskList.title = action.payload.title || taskList.title;
        }
        return taskList;
      });
    }
    case 'DELETE_LIST': {
      return taskLists.filter(item => item.id !== action.payload.id)
  }
    case "ADD_TASK_ID_TO_TASKLIST": {
      return taskLists.map((taskList) => {
        if (taskList.id === action.payload.taskList) {
          taskList.tasks = taskList.tasks.push(action.payload.taskId);
        }
        return taskList;
      });
    }
    case "REMOVE_TASK_ID_FROM_TASKLIST": {
      return taskLists.map((taskList) => {
        if (taskList.id === action.payload.taskList) {
          taskList.tasks = taskList.tasks.filter((item) => item.id !== action.payload.taskId);
        }
        return taskList;
      });
    }
    case "CHANGE_BOARD_ID_OF_LIST": {
      return taskLists.map((taskList) => {
        if (taskList.id === action.payload.taskList) {
          taskList.boardId = action.payload.boardId
        }
        return taskList;
      });
    }
    default: {
      return taskLists;
    }
  }
};
