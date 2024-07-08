import { useState } from "react";
import Form from "./components/form/Form";
import ListTasks from "./components/tasks/ListTasks";
import ListTasksDone from "./components/tasks/ListTasksDone";
import "./App.css";

function App() {
  const url = "http://localhost:5000/";
  const [inputValue, setInputValue] = useState("");
  const [checkBox, setCheckBox] = useState(false);
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoDone, setTodoDone] = useState([]);
  const [idTask, setIdTask] = useState(0);
  const [error, setError] = useState(false);

  // "http://localhost:5000/todoDone"
  // "http://localhost:5000/todo"

  // post tasks
  function postTasks(list) {
    try {
      fetch(`${url}${list}`, {
        method: "POST",
        body: JSON.stringify({
          task: inputValue.trim(),
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
    if (inputValue === "") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      if (checkBox) {
        postTasks("todoDone");
      } else {
        postTasks("todo");
      }
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
    let confirmation = window.confirm("Are you sure ?");
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
        task: inputValue.trim(),
        checked: checkBox,
      }),
      headers: {
        "Content-type": "aplication/json",
      },
    });
    setEdit(false);
    setCheckBox(false);
    setInputValue("");
  }

  return (
    <div className="app">
      <div>
        <h2>Todo List</h2>
        <Form
          submit={submit}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCheckBox={setCheckBox}
          checked={checkBox}
          edit={edit}
          editTask={editTask}
          error={error}
        />
        {todos.length > 0 ? (
          <ListTasks
            todos={todos}
            deleteTask={deleteTask}
            getTask={getTask}
            url={url}
          />
        ) : (
          <p className="empty">There is not task</p>
        )}
      </div>
      <div>
        <h2>Todo Done</h2>
        {todoDone.length > 0 ? (
          <ListTasksDone
            todoDone={todoDone}
            deleteTask={deleteTask}
            url={url}
          />
        ) : (
          <p className="empty">There is not task</p>
        )}
      </div>
    </div>
  );
}

export default App;
