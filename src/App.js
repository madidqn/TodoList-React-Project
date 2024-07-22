import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import Form from "./components/form/Form";
import ListTasks from "./components/tasks/ListTasks";
import ListTasksDone from "./components/tasks/ListTasksDone";
import "./App.css";

const initialState = {
  inputValue: "",
  inputCheckBox: false,
  error: false,
};
// function useReducer
const reducer = (prevState, action) => {
  if (action?.type === "submit") {
    action.func(action?.payload);
    return { inputValue: "", inputCheckBox: false, error: false };
  }
  if (action?.type === "error") {
    return { inputValue: "", inputCheckBox: false, error: action?.payload };
  }
  if (action?.type === "task") {
    return { ...prevState, inputValue: action?.payload };
  }
  if (action?.type === "check") {
    return { ...prevState, inputCheckBox: action?.payload };
  }
  if (action?.type === "edit") {
    return { inputValue: "", inputCheckBox: false, error: false };
  }
  if (action?.type === "edit-icon") {
    const filterData = action.func(action?.payload);
    return {
      inputValue: filterData[0].task,
      inputCheckBox: filterData[0].checked,
      error: false,
    };
  }
};
function App() {
  const url = "http://localhost:5000/";
  const [state, dispatch] = useReducer(reducer, initialState);
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoDone, setTodoDone] = useState([]);
  const [idTask, setIdTask] = useState(0);

  // "http://localhost:5000/todoDone"
  // "http://localhost:5000/todo"

  useEffect(() => {
    getTasks("todo");
    getTasks("todoDone");
  }, [todos, todoDone]);

  // post tasks
  const postTasks = (list) => {
    try {
      fetch(`${url}${list}`, {
        method: "POST",
        body: JSON.stringify({
          task: state?.inputValue.trim(),
          checked: state?.inputCheckBox,
        }),
        headers: {
          "Content-type": "aplication/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  // submit form
  const submit = (e) => {
    e.preventDefault();
    if (state?.inputValue === "") {
      dispatch({ type: "error", payload: true });
      setTimeout(() => {
        dispatch({ type: "error", payload: false });
      }, 3000);
    } else {
      if (state?.inputCheckBox) {
        postTasks("todoDone");
      } else {
        postTasks("todo");
      }
    }
  };

  // get tasks
  const getTasks = async (list) => {
    if (list === "todo") {
      const response = await fetch(`${url}todo`);
      const data = await response.json();
      setTodos(data);
    } else {
      const response = await fetch(`${url}todoDone`);
      const data = await response.json();
      setTodoDone(data);
    }
  };

  // delete task
  const deleteTask = async (id, list) => {
    let confirmation = window.confirm("Are you sure ?");
    if (confirmation) {
      fetch(`${url}${list}/${id}`, {
        method: "DELETE",
      });
    }
  };

  // get single task
  const getTask = (id) => {
    setEdit(true);
    const filterData = todos.filter((user) => user.id === id);
    setIdTask(filterData[0].id);
    return filterData;
  };

  // edit task
  const editTask = () => {
    fetch(`${url}todo/${idTask}`, {
      method: "PATCH",
      body: JSON.stringify({
        task: state.inputValue.trim(),
        checked: state.inputCheckBox,
      }),
      headers: {
        "Content-type": "aplication/json",
      },
    });
    setEdit(false);
    dispatch({ type: "edit" });
  };

  return (
    <div className="app">
      <div>
        <h2>Todo List</h2>
        <Form
          state={state}
          dispatch={dispatch}
          submit={submit}
          edit={edit}
          editTask={editTask}
        />
        {todos?.length > 0 ? (
          <ListTasks
            todos={todos}
            deleteTask={deleteTask}
            getTask={getTask}
            dispatch={dispatch}
            url={url}
          />
        ) : (
          <p className="empty">There is not task</p>
        )}
      </div>
      <div>
        <h2>Todo Done</h2>
        {todoDone?.length > 0 ? (
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
