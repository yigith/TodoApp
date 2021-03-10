import { useState, useEffect, useContext } from 'react';
import AppContext from './AppContext';
import './Home.css';

function Home() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const ctx = useContext(AppContext);
  const [todos, setTodos] = useState([{ name: "Loading.."}]);
  const [newTodo, setNewTodo] = useState({ id: 0, name: "", isCompleted: false});

  const addNewTodo = (e) => {
    e.preventDefault();
    fetch(apiUrl + "TodoItems", {
      method: "post",
      headers: {
        "Authorization" : "Bearer " + ctx.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
    .then(response => response.json())
    .then(json => {
      setTodos([...todos, json]);
      setNewTodo({ id: 0, name: "", isCompleted: false});
    });
  } 

  useEffect(() => {
    // https://jsonplaceholder.typicode.com/todos
    fetch(apiUrl + "TodoItems", {
      headers: {
        "Authorization" : "Bearer " + ctx.token
      }
    })
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <form onSubmit={addNewTodo}>
        <input type="text" 
          value={newTodo.name} 
          onInput={e=>setNewTodo({...newTodo, name: e.target.value})} 
          placeholder="what will you do?" required />
      </form>
      <ul>
        {todos.map((x, i) => <li key={i}>{x.name}</li>)}
      </ul>
    </div>
  )
}

export default Home;