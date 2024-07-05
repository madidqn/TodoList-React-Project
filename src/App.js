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
                <i class="bx bxs-trash"></i>
                <i class="bx bxs-edit-alt"></i>
                <i class="bx bx-select-multiple"></i>
              </div>
            </div>
            <div>
              <li>task</li>
              <div>
                <i class="bx bxs-trash"></i>
                <i class="bx bxs-edit-alt"></i>
                <i class="bx bx-select-multiple"></i>
              </div>
            </div>
            <div>
              <li>task</li>
              <div>
                <i class="bx bxs-trash"></i>
                <i class="bx bxs-edit-alt"></i>
                <i class="bx bx-select-multiple"></i>
              </div>
            </div>
          </ul>
        </form>
      </div>
      <div>
        <h2>Todo Done</h2>
        <ul>
          <div>
            <li>task</li>
            <div>
              <i class="bx bxs-trash"></i>
              <i class="bx bxs-edit-alt"></i>
              <i class="bx bx-redo bx-rotate-180"></i>
            </div>
          </div>
          <div>
            <li>task</li>
            <div>
              <i class="bx bxs-trash"></i>
              <i class="bx bxs-edit-alt"></i>
              <i class="bx bx-redo bx-rotate-180"></i>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;
