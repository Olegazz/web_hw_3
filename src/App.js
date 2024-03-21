import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (status) => {
    const newTask = {
      id: Date.now(),
      title: "",
      description: "",
      status: status,
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (task, newStatus) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, status: newStatus };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  };

  const editTask = (task, newTitle, newDescription) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        return { ...t, title: newTitle, description: newDescription };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  return (
      <div className="container">
        <div className="column todo">
          <h1>To Do</h1>
          {tasks
              .filter((task) => task.status === "todo")
              .map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      moveTask={moveTask}
                      deleteTask={deleteTask}
                      editTask={editTask}
                  />
              ))}
          <button onClick={() => addTask("todo")}>Add Task</button>
        </div>
        <div className="column in-progress">
          <h1>In Progress</h1>
          {tasks
              .filter((task) => task.status === "in progress")
              .map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      moveTask={moveTask}
                      deleteTask={deleteTask}
                      editTask={editTask}
                  />
              ))}
          <button onClick={() => addTask("in progress")}>Add Task</button>
        </div>
        <div className="column done">
          <h1>Done</h1>
          {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                  <Task
                      key={task.id}
                      task={task}
                      moveTask={moveTask}
                      deleteTask={deleteTask}
                      editTask={editTask}
                  />
              ))}
          <button onClick={() => addTask("done")}>Add Task</button>
        </div>
      </div>
  );
};

export default App;