import { useState } from "react";
import Form from "./components/form/Form";
import "./App.css";

function App() {
  const url = "http://localhost:5000/";
  const [inputValue, setInputValue] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoDone, setTodoDone] = useState([]);
  const [idTask, setIdTask] = useState(0);
  // completed tasks//
  // "http://localhost:5000/todoDone"
  // "http://localhost:5000/todo"

  // post tasks
  function postTasks(list) {
    try {
      fetch(`${url}${list}`, {
        method: "POST",
        body: JSON.stringify({
          task: inputValue,
          checked: checkBox,
        }),
        headers: {
          "Content-type": "aplication/json",
        },
      });
      setCheckBox(false);
      setInputValue("");
    } catch (e) {
      console.log(e);
    }
  }
  // submit form
  function submit(e) {
    e.preventDefault();
    if (checkBox) {
      postTasks("todoDone");
    } else {
      postTasks("todo");
    }
  }
  // get tasks
  async function getTasks(list) {
    if (list === "todo") {
      const response = await fetch(`${url}todo`);
      const data = await response.json();
      setTodos(data);
    } else {
      const response = await fetch(`${url}todoDone`);
      const data = await response.json();
      setTodoDone(data);
    }
  }
  getTasks("todo");
  getTasks("todoDone");

  // delete task
  async function deleteTask(id, list) {
    let confirmation = window.confirm("Are you shure?");
    if (confirmation) {
      fetch(`${url}${list}/${id}`, {
        method: "DELETE",
      });
    }
  }
  // get single task
  function getTask(id) {
    setEdit(true);
    const filterData = todos.filter((user) => user.id === id);
    setInputValue(filterData[0].task);
    setCheckBox(filterData[0].checked);
    setIdTask(filterData[0].id);
  }
  // edit task
  function editTask() {
    fetch(`${url}todo/${idTask}`, {
      method: "PATCH",
      body: JSON.stringify({
        task: inputValue,
        checked: checkBox,
      }),
      headers: {
        "Content-type": "aplication/json",
      },
      // headers: { "Access-Control-Allow-Origin": "*" },
    });
    setEdit(false);
    setCheckBox(false);
    setInputValue("");
  }

  // list done
  function submitTaskDone(id) {
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
  }
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
    <div className="app">
      <div>
        <h2>Todo List</h2>
        {/* <form onSubmit={(e) => submit(e)}>
          <div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <input
              type="checkbox"
              onChange={(e) => setCheckBox(e.target.checked)}
              checked={checkBox}
            />
          </div>
          <button className={!edit ? "" : "noneActive"}>Add</button>
          <button
            type="button"
            className={edit ? "" : "noneActive"}
            onClick={() => editTask()}
          >
            Edit
          </button>
        </form> */}
        <Form
          submit={submit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCheckBox={setCheckBox}
          checked={checkBox}
          edit={edit}
          editTask={editTask}
        />
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
                  onClick={() => getTask(todo.id)}
                ></i>
                <i
                  className="bx bx-select-multiple"
                  onClick={() => submitTaskDone(todo.id)}
                ></i>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <div>
        <h2>Todo Done</h2>
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
      </div>
    </div>
  );
}

export default App;
