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
        <InputTask inputValue={inputValue} setInputValue={setInputValue} />
        <InputCheckBox setCheckBox={setCheckBox} checked={checked} />
      </div>
      <Buttons edit={edit} editTask={editTask} />
    </form>
  );
}
export default Form;
