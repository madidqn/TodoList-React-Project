function ListTasksDone({ todoDone, deleteTask, url }) {
  function sendToUndoTasks(id) {
    const filterData = todoDone.filter((user) => user.id === id);
    deleteTask(id, "todoDone");
    try {
      fetch(`${url}todo`, {
        method: "POST",
        body: JSON.stringify({
          task: filterData[0].task,
          checked: filterData[0].checked,
        }),
        headers: {
          "Content-type": "aplication/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
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
