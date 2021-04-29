import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(userInput);
    setUserInput("");
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
    handleToggle(e.target.id);
  };

  const handleToggle = (id) => {
    let mapped = toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
    console.log(mapped);
  };

  const handleFilter = () => {
    let filtered = toDoList.filter((task) => {
      return !task.complete;
    });
    setToDoList(filtered);
  };

  const addTask = (userInput) => {
    let copy = [
      ...toDoList,
      { id: Date.now(), task: userInput, complete: false },
    ];
    setToDoList(copy);
  };

  const deleteTask = (id) => {
    let filtered = toDoList.filter((todo) => todo.id !== id);
    setToDoList(filtered);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={userInput} onChange={handleChange} />
        <button>Add Task</button>
      </form>
      <button onClick={handleFilter}>Clear</button>
      {toDoList.map((todo, i) => {
        return (
          <>
            <li
              id={todo.id}
              key={todo.id}
              name="todo"
              value={todo.id}
              onClick={handleClick}
              className={todo.complete ? "complete" : ""}
            >
              {todo.task}

              {/* <span id={todo.id} value={todo.id} onClick={handleClick}>
                Complete
              </span> */}
            </li>
            <button onClick={() => deleteTask(todo.id)}>Delete</button>
          </>
        );
      })}
    </div>
  );
};

export default Home;
