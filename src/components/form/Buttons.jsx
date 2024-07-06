function Buttons({ edit, editTask }) {
  return (
    <>
      <button className={!edit ? "" : "inactive"}>Add</button>
      <button
        type="button"
        className={edit ? "" : "inactive"}
        onClick={() => editTask()}
      >
        Edit
      </button>
    </>
  );
}
export default Buttons;
