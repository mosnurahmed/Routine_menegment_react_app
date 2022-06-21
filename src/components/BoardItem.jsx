import { icons } from "../assets";
import { useContext } from "react";

import { BoardContext } from "../context/BoardContext";
import { TaskListContext } from "../context/TaskListContext";
import { TaskContext } from "../context/TaskContext";

function BoardItem({board}) {
  const { dispatchBoardAction } = useContext(BoardContext);
  const { taskLists, dispatchTaskListAction } = useContext(TaskListContext);
  const { tasks, dispatchTaskAction } = useContext(TaskContext);

  const removeBoardHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const toBeTaskListDeleted = taskLists.filter((list) => list.boardId === board.id);
    const toBeTaskDeleted = tasks.filter((task) => task.boardId === board.id);

    dispatchBoardAction({ type: "DELETE_BOARD", payload: { id:board.id } });

    toBeTaskListDeleted.forEach((list) => {
      dispatchTaskListAction({ type: "DELETE_TASKLIST", payload: { id: list.id } });
    });
    toBeTaskDeleted.forEach((task) => {
      dispatchTaskAction({ type: "DELETE_TASK", payload: { id: task.id } });
    });
  };
  // console.log(board);
  console.log(board.createdAt);

  return (
    <div className="board-box d-flex flex-direction-column">
      <div className="d-flex justify-content-between">
        <h5 className="title-gap">{board.title}</h5>
        <img
          className="add-item-icon"
          onClick={(e) => removeBoardHandler(e)}
          src={icons.crossIcon}
          alt="Delete Board"
        />
      </div>
      <p className="title-gap align-self-flex-end">This board has {board.taskLists.length} List</p>
      <p className="title-gap align-self-flex-end">Create at {board.createdAt}</p>
    </div>
  );
}
export default BoardItem;
