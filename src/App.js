import "./App.css";

function App() {
  return (
    <div className="app">
      <div>
        <h2>Todo List</h2>
        <form>
          <div>
            <input type="text" />
            <input type="checkbox" />
          </div>
          <button>Add</button>
          <button>Edit</button>
          <ul>
            <div>
              <li>task</li>
              <div>
                <i>delete</i>
                <i>edit</i>
                <i>done</i>
              </div>
            </div>
          </ul>
        </form>
      </div>
      <div>
        <h2>Todo List</h2>
        <ul>
          <div>
            <li>task</li>
            <div>
              <i>delete</i>
              <i>edit</i>
              <i>done</i>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;
