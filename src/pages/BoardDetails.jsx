import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import { TaskContext } from "../context/TaskContext";
import { BoardContext } from "../context/BoardContext";
import { TaskListContext } from "../context/TaskListContext";
import TaskList from "../components/TaskList";

const BoardDetails = () => {
  const [listTitle, setListTitle] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { boardId } = useParams();
  const { taskLists, dispatchTaskListAction } = useContext(TaskListContext);
  const { dispatchBoardAction } = useContext(BoardContext);

  const submitListHandler = () => {
    const id = Date.now();
    dispatchTaskListAction({ type: "CREATE_TASKLIST", payload: { id: id, title: listTitle, boardId: boardId } });
    dispatchBoardAction({ type: "ADD_LIST_ID_TO_BOARD", payload: { taskListId: id, boardId: boardId } });
    setListTitle("");
    setEditMode(false);
  };

  return (
    <div className="d-flex m-top-sm flex-direction-row">
      <Link to="/">Back to Boards</Link>

      {taskLists
        ?.filter((item) => item.boardId === boardId)
        ?.map((taskList) => (
          <TaskList taskList={taskList} key={taskList.id} />
        ))}
      {!editMode ? (
        <AddItem listAddItem setEditMode={setEditMode} />
      ) : (
        <AddItemForm
          setEditMode={setEditMode}
          listForm
          submitHandler={submitListHandler}
          title={listTitle}
          onChangeHandler={(e) => setListTitle(e.target.value)}
        />
      )}
    </div>
  );
};
export default BoardDetails;
