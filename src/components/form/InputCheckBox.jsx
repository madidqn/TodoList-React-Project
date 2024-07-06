function InputCheckBox({ setCheckBox, checked }) {
  return (
    <input
      type="checkbox"
      onChange={(e) => setCheckBox(e.target.checked)}
      checked={checked}
    />
  );
}
export default InputCheckBox;
