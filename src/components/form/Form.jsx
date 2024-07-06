import InputTask from "./InputTask";
import InputCheckBox from "./InputCheckBox";
import Buttons from "./Buttons";

function Form({
  submit,
  inputValue,
  setInputValue,
  setCheckBox,
  checked,
  edit,
  editTask,
}) {
  return (
    <form onSubmit={(e) => submit(e)}>
      <div>
        {/* <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        /> */}
        <InputTask inputValue={inputValue} setInputValue={setInputValue} />
        {/* <input
          type="checkbox"
          onChange={(e) => setCheckBox(e.target.checked)}
          checked={checked}
        /> */}
        <InputCheckBox setCheckBox={setCheckBox} checked={checked} />
      </div>
      {/* <button className={!edit ? "" : "noneActive"}>Add</button>
      <button
        type="button"
        className={edit ? "" : "noneActive"}
        onClick={() => editTask()}
      >
        Edit
      </button> */}
      <Buttons edit={edit} editTask={editTask} />
    </form>
  );
}
export default Form;
