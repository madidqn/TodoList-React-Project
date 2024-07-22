import InputTask from "./InputTask";
import Buttons from "./Buttons";

function Form({ submit, state, dispatch, edit, editTask }) {
  return (
    <form
      onSubmit={(e) => dispatch({ type: "submit", payload: e, func: submit })}
    >
      {state.error ? <p>Please enter something</p> : ""}
      <div>
        <InputTask>
          <input
            type="text"
            placeholder="Please enter your task"
            value={state.inputValue}
            onChange={(e) =>
              dispatch({ type: "task", payload: e.target.value })
            }
          />
        </InputTask>
        <InputTask>
          <input
            type="checkbox"
            onChange={(e) =>
              dispatch({ type: "check", payload: e.target.checked })
            }
            checked={state.inputCheckBox}
          />
        </InputTask>
      </div>
      <Buttons edit={edit} editTask={editTask} />
    </form>
  );
}
export default Form;
