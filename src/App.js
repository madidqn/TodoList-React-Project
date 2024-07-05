import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  function submit(e) {
    e.preventDefault();
    console.log(task);
    setTodos(task);
    setTask("");
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
            <input type="checkbox" />
          </div>
          <button>Add</button>
          <button type="button">Edit</button>
        </form>
        <ul>
          <div>
            <li>{todos}</li>
            <div>
              <i className="bx bxs-trash"></i>
              <i className="bx bxs-edit-alt"></i>
              <i className="bx bx-select-multiple"></i>
            </div>
          </div>
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
