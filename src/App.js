import React, { useState, useEffect } from "react";
import "./App.css";
import Task from "./Task";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

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

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const editTask = (taskId, newTitle, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId.toString());
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, status) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    moveTask(taskId, status);
  };

  return (
      <div className="container">
        <div className="column todo" onDragOver={onDragOver} onDrop={(e) => onDrop(e, "todo")}>
          <h1>To Do</h1>
          {tasks.map((task) => (
              task.status === "todo" && (
                  <Task
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      editTask={editTask}
                      onDragStart={onDragStart}
                  />
              )
          ))}
          <button onClick={() => addTask("todo")}>Add Task</button>
        </div>
        <div className="column in-progress" onDragOver={onDragOver} onDrop={(e) => onDrop(e, "in progress")}>
          <h1>In Progress</h1>
          {tasks.map((task) => (
              task.status === "in progress" && (
                  <Task
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      editTask={editTask}
                      onDragStart={onDragStart}
                  />
              )
          ))}
          <button onClick={() => addTask("in progress")}>Add Task</button>
        </div>
        <div className="column done" onDragOver={onDragOver} onDrop={(e) => onDrop(e, "done")}>
          <h1>Done</h1>
          {tasks.map((task) => (
              task.status === "done" && (
                  <Task
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      editTask={editTask}
                      onDragStart={onDragStart}
                  />
              )
          ))}
          <button onClick={() => addTask("done")}>Add Task</button>
        </div>
      </div>
  );
};

export default App;