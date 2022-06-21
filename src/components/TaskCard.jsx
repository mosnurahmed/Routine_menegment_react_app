import { useContext, useState } from "react";
import { icons } from "../assets";

import AddItemForm from "./AddItemForm";
import { BoardContext } from "../context/BoardContext";
import { TaskContext } from "../context/TaskContext";
import { TaskListContext } from "../context/TaskListContext";

function TaskCard({task}) {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [editMode, setEditMode] = useState(false);
  const { dispatchBoardAction } = useContext(BoardContext);
  const { dispatchTaskAction } = useContext(TaskContext);
  const { dispatchTaskListAction } = useContext(TaskListContext);

  const submitTaskHandler = (e) => {
    e.preventDefault();
    dispatchTaskAction({ type: "UPDATE_TASK", payload: { id: task.id, title: taskTitle } });
    setEditMode(false);
  };

  const removeTaskHandler = () => {
    dispatchTaskAction({ type: "DELETE_TASK", payload: { id: task.id } });
    dispatchTaskListAction({
      type: "REMOVE_TASK_ID_FROM_TASKLIST",
      payload: { id: task.id, boardId: task.taskListId },
    });
    dispatchBoardAction({ type: "REMOVE_TASK_ID_FROM_BOARD", payload:{id:task.id , boardId:task.boardId} });
  };
 
  console.log(task);
  return (
    <div >
      {editMode ? (
        <AddItemForm
          onChangeHandler={(e) => setTaskTitle(e.target.value)}
          title={taskTitle}
          setEditMode={setEditMode}
          submitHandler={submitTaskHandler}
        />
      ) : (
        <div
          onClick={(e) => {
            setEditMode(true);
          }}
          className="task-card"
        >
          <p>{taskTitle}</p>
          <img onClick={removeTaskHandler} className="add-item-icon" src={icons.crossIcon} alt="" />
        </div>
      )}
    </div>
  );
}

export default TaskCard;
