import { useContext, useState } from "react";

import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";
import TaskCard from "./TaskCard";
import { icons } from "../assets";

import { BoardContext } from "../context/BoardContext";
import { TaskListContext } from "../context/TaskListContext";
import { TaskContext } from "../context/TaskContext";

export default function TaskList({ taskList }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [editMode, setEditMode] = useState(false);

  const { title } = taskList;
  const { dispatchBoardAction } = useContext(BoardContext);
  const { tasks: allTasks, dispatchTaskAction } = useContext(TaskContext);
  const { dispatchTaskListAction } = useContext(TaskListContext);

  const submitHandler = (e) => {
    e.preventDefault();
    const id = Date.now();

    dispatchTaskAction({
      type: "CREATE_TASK",
      payload: { id: id, title: taskTitle, taskListId: taskList.id, boardId: taskList.boardId },
    });
    dispatchTaskListAction({ type: "ADD_TASK_ID_TO_TASKLIST", payload: { taskId: id, id: taskList.id } });
    dispatchBoardAction({ type: "ADD_TASK_ID_TO_BOARD", payload: { taskId: id, boardId: taskList.boardId } });

    setTaskTitle("");
    setEditMode(false);
  };

  const removeListHandler = () => {
    dispatchTaskListAction({ type: "DELETE_LIST", payload: { id: taskList.id } });
    dispatchBoardAction({
      type: "REMOVE_LIST_ID_FROM_BOARD",
      payload: { id: taskList.boardId, taskListId: taskList.id },
    });
  };
  // console.log(all);
  return (
    <div className="list-container">
      <div className="list-title-container">
        <h5>{title}</h5>
        <img onClick={removeListHandler} className="add-item-icon" src={icons.crossIcon} alt="" />
      </div>
      {allTasks
        .filter((item) => item.taskListId === taskList.id)
        ?.map((task, index) => (
          <TaskCard index={index} id={task.id} taskList={taskList} task={task} key={task.id} />
        ))}

      {editMode ? (
        <AddItemForm
          submitHandler={submitHandler}
          title={taskTitle}
          onChangeHandler={(e) => setTaskTitle(e.target.value)}
          setEditMode={setEditMode}
          editMode={editMode}
        />
      ) : (
        <AddItem setEditMode={setEditMode} />
      )}
    </div>
  );
}
