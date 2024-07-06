function Buttons({ edit, editTask }) {
  return (
    <>
      <button className={!edit ? "" : "noneActive"}>Add</button>
      <button
        type="button"
        className={edit ? "" : "noneActive"}
        onClick={() => editTask()}
      >
        Edit
      </button>
    </>
  );
}
export default Buttons;
