import { useContext, useState } from "react";
import { BoardContext } from "../context/BoardContext";

function BoardCreatingFrom() {
  const [boardTitle, setBoardTitle] = useState("");
  const { dispatchBoardAction } = useContext(BoardContext);

  const submitHandler = (e) => {
    e.preventDefault();
    if (boardTitle) {
      dispatchBoardAction({ type: "CREATE_BOARD", payload: { title: boardTitle } });
      setBoardTitle("");
    } else {
      alert(`Please Provide Board name`);
    }
  };

  return (
    <div className="align-center m-top-md">
      <form onSubmit={(e) => submitHandler(e)}>
        <input type="text" name="boardTitle" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} id="" />
        <button type="submit" onClick={(e) => submitHandler(e)}>
          Create Boards
        </button>
      </form>
    </div>
  );
}
export default BoardCreatingFrom;
