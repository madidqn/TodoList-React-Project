function ListTasksDone({ todoDone, deleteTask, sendToUndoTasks }) {
  return (
    <ul>
      {todoDone.map((todo) => (
        <div key={todo.id}>
          <li>{todo.task}</li>
          <div>
            <i
              className="bx bxs-trash"
              onClick={() => deleteTask(todo.id, "todoDone")}
            ></i>
            <i
              className="bx bx-redo bx-rotate-180"
              onClick={() => sendToUndoTasks(todo.id)}
            ></i>
          </div>
        </div>
      ))}
    </ul>
  );
}
export default ListTasksDone;
