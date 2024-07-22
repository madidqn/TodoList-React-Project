function ListTasks({ todos, deleteTask, getTask, url, dispatch }) {
  const submitTaskDone = (id) => {
    const filterData = todos.filter((user) => user.id === id);
    deleteTask(id, "todo");
    try {
      fetch(`${url}todoDone`, {
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
  };
  return (
    <ul>
      {todos.map((todo) => (
        <div key={todo.id}>
          <li>{todo.task}</li>
          <div>
            {todo.checked}
            <i
              className="bx bxs-trash"
              onClick={() => deleteTask(todo.id, "todo")}
            ></i>
            <i
              className="bx bxs-edit-alt"
              onClick={() =>
                dispatch({ type: "edit-icon", payload: todo.id, func: getTask })
              }
            ></i>
            <i
              className="bx bx-select-multiple"
              onClick={() => submitTaskDone(todo.id)}
            ></i>
          </div>
        </div>
      ))}
    </ul>
  );
}
export default ListTasks;
