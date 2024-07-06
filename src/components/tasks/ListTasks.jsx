function ListTasks({ todos, deleteTask, getTask, submitTaskDone }) {
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
            <i className="bx bxs-edit-alt" onClick={() => getTask(todo.id)}></i>
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
