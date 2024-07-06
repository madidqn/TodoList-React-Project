function InputTask({ inputValue, setInputValue }) {
  return (
    <input
      type="text"
      placeholder="Please enter your task"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
export default InputTask;
