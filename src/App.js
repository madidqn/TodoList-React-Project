import { useState } from "react";
import "./App.css";

function App() {
  //const url = "http://localhost:5000/todo";
  const url = "http://localhost:5000/";
  const [inputValue, setInputValue] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoDone, setTodoDone] = useState([]);
  const [idTask, setIdTask] = useState(0);
  // completed tasks//
  function submit(e) {
    e.preventDefault();
    //post data
    try {
      fetch(`${url}todo`, {
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

  // get data
  async function getData() {
    const response = await fetch(`${url}todo`);
    const data = await response.json();
    setTodos(data);
  }
  getData();
  // delete task
  function deleteTask(id) {
    let confirmation = window.confirm("Are you shure?");
    if (confirmation) {
      fetch(`${url}todo/${id}`, {
        method: "DELETE",
      });
    }
  }
  // get task
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
  // postTask
  // "http://localhost:5000/todoDone"
  function postTask(id) {
    const filterData = todos.filter((user) => user.id === id);
    deleteTask(id);
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
  async function getDone() {
    const response = await fetch(`${url}todoDone`);
    const data = await response.json();
    setTodoDone(data);
  }
  getDone();
  function deleteTaskDone(id) {
    let confirmation = window.confirm("Are you shure?");
    if (confirmation) {
      fetch(`${url}todoDone/${id}`, {
        method: "DELETE",
      });
    }
  }
  function postTaskDone(id) {
    const filterData = todoDone.filter((user) => user.id === id);
    deleteTaskDone(id);
    try {
      fetch(url, {
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
        <form onSubmit={(e) => submit(e)}>
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
        </form>
        <ul>
          {todos.map((todo) => (
            <div key={todo.id}>
              <li>{todo.task}</li>
              <div>
                {todo.checked}
                <i
                  className="bx bxs-trash"
                  onClick={() => deleteTask(todo.id)}
                ></i>
                <i
                  className="bx bxs-edit-alt"
                  onClick={() => getTask(todo.id)}
                ></i>
                <i
                  className="bx bx-select-multiple"
                  onClick={() => postTask(todo.id)}
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
                  onClick={() => deleteTaskDone(todo.id)}
                ></i>
                <i
                  className="bx bx-redo bx-rotate-180"
                  onClick={() => postTaskDone(todo.id)}
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
