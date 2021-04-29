// COMPLETE TODO LIST APP with input, add btn, clear complete btn, tasks entered added in li with del btn and checkbox(toggle)

import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [error, setError] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!input || input.replace(/^\S.*/g, "")) {
      return setError("! Please enter task");
    }
    setTaskList([
      ...taskList,
      { id: Date.now(), value: input, complete: false },
    ]);
    setInput("");
    setError("");
  };

  const clearComplete = () => {
    let clear = taskList.filter((task) => {
      return !task.complete;
    });
    setTaskList(clear);
  };

  const deleteTask = (id) => {
    let deleteList = taskList.filter((task) => task.id !== id);
    setTaskList(deleteList);
  };

  const completeTask = (id) => {
    let completeTask = taskList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setTaskList(completeTask);
  };

  // console.log(taskList);

  return (
    <div className="todo">
      <h2>Todo List</h2>
      <form className="todoForm">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError("");
          }}
          type="text"
          placeholder="Enter task..."
        />
        <button className="addBtn" type="submit" onClick={addTask}>
          Add Task
        </button>
      </form>
      <div className="error">{error}</div>
      <button className="clear" onClick={clearComplete}>
        Clear Complete
      </button>
      <ul className="taskList">
        {taskList.map((task) => (
          <li
            key={task.id}
            id={task.id}
            className={task.complete ? "complete" : ""}
          >
            <span>
              <input
                className="checkbox"
                type="checkbox"
                id={task.id}
                onChange={(e) => completeTask(e.target.id)}
              />
              {task.value}
            </span>

            <span className="buttons">
              {/* <button
                className="cmplBtn"
                id={task.id}
                onClick={(e) => completeTask(e.target.id)}
              >
                {task.complete ? "Incomplete" : "Complete"}
              </button> */}

              <button className="delBtn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
