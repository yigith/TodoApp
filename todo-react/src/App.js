import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([{ name: "Loading.."}]);

  useEffect(() => {
    // https://jsonplaceholder.typicode.com/todos
    fetch("https://localhost:5001/api/TodoItems")
      .then(response => response.json())
      .then(json => setTodos(json));
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <ul>
        {todos.map((x, i) => <li key={i}>{x.name}</li>)}
      </ul>
    </div>
  )
}

export default App;
