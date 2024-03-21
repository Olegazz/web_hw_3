import React, { useState } from "react";
import "./App.css";

const Task = ({ task, moveTask, deleteTask, editTask, onDragStart, onDragOver, onDrop, status }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleMoveLeft = () => {
        switch (task.status) {
            case "todo":
                return;
            case "in progress":
                moveTask(task, "todo");
                break;
            case "done":
                moveTask(task, "in progress");
                break;
            default:
                break;
        }
    };

    const handleMoveRight = () => {
        switch (task.status) {
            case "todo":
                moveTask(task, "in progress");
                break;
            case "in progress":
                moveTask(task, "done");
                break;
            case "done":
                return;
            default:
                break;
        }
    };

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        editTask(task, title, description);
    };

    return (
        <div className="task"
             draggable={true}
             onDragStart={(e) => onDragStart(e, task)}
             onDragOver={(e) => onDragOver(e)}
             onDrop={(e) => onDrop(e, status)}
        >
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                </>
            )}
            <div className="buttons">
                <button onClick={handleMoveLeft}>&lt;</button>
                <button onClick={handleMoveRight}>&gt;</button>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default Task;