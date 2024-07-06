import { useState } from "react";
import "./App.css";

function App() {
  const url = "http://localhost:5000/todo";
  const [task, setTask] = useState("");
  const [check, setCheck] = useState(false);
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [singleTask, setSingleTask] = useState("");
  function submit(e) {
    e.preventDefault();
    //post data
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        task: task,
        checked: check,
      }),
      headers: {
        "Content-type": "aplication/json",
      },
    });
    setCheck(false);
    setTask("");
  }

  // get data
  async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    setTodos(data);
  }
  getData();
  // delete task
  function deleteTask(id) {
    let confirmation = window.confirm("Are you shure?");
    if (confirmation) {
      fetch(url + `/${id}`, {
        method: "DELETE",
      });
    }
  }
  // get task
  async function getTask(id) {
    const response = await fetch(url + `/${id}`);
    const task = await response.json();
    setSingleTask(task);
    setTask(task.task);
    setCheck(task.checked);
  }
  // edit task
  function editTask(id) {
    getTask(id);
    fetch(url + `/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        task: task,
        checked: check,
      }),
      headers: {
        "Content-type": "aplication/json",
      },
    });
  }
  return (
    <div className="app">
      <div>
        <h2>Todo List</h2>
        <form onSubmit={(e) => submit(e)}>
          <div>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <input
              type="checkbox"
              onChange={(e) => setCheck(e.target.checked)}
            />
          </div>
          <button>Add</button>
          <button type="button" className={edit ? "" : "noneActive"}>
            Edit
          </button>
        </form>
        <ul>
          {todos.map((user) => (
            <div key={user.id}>
              <li>{user.task}</li>
              <div>
                {user.checked}
                <i
                  className="bx bxs-trash"
                  onClick={() => deleteTask(user.id)}
                ></i>
                <i
                  className="bx bxs-edit-alt"
                  onClick={() => editTask(user.id)}
                ></i>
                <i className="bx bx-select-multiple"></i>
              </div>
            </div>
          ))}
          {/* <div>
            <li>task</li>
            <div>
              <i className="bx bxs-trash"></i>
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bx-select-multiple"></i>
            </div>
          </div>
          <div>
            <li>task</li>
            <div>
              <i className="bx bxs-trash"></i>
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bx-select-multiple"></i>
            </div>
          </div> */}
        </ul>
      </div>
      <div>
        <h2>Todo Done</h2>
        <ul>
          <div>
            <li>task</li>
            <div>
              <i className="bx bxs-trash"></i>
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bx-redo bx-rotate-180"></i>
            </div>
          </div>
          <div>
            <li>task</li>
            <div>
              <i className="bx bxs-trash"></i>
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bx-redo bx-rotate-180"></i>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;
