import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addOrUpdateTodo = () => {
    if (title.trim() === "" || desc.trim() === "") {
      alert("Please enter both title and description!");
      return;
    }

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = { ...updatedTodos[editIndex], title, desc };
      setTodos(updatedTodos);
      alert("Task updated successfully!");
      setEditIndex(null);
    } else {
      setTodos([...todos, { title, desc, completed: false }]);
      alert("Task added successfully!");
    }

    setTitle("");
    setDesc("");
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    alert("Task deleted successfully!");
  };

  const editTodo = (index) => {
    setTitle(todos[index].title);
    setDesc(todos[index].desc);
    setEditIndex(index);
  };

  return (
    <div className="app">
      <h1 className="title">ZapTask</h1>
      <div className="input-section">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter Task Description"
        />
        <button onClick={addOrUpdateTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={todo.completed ? "completed" : ""}
          >
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <div>
                <strong>{todo.title}</strong>
                <p>{todo.desc}</p>
              </div>
            </div>
            <div className="buttons">
              <button className="edit" onClick={() => editTodo(index)}>Edit</button>
              <button className="delete" onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
