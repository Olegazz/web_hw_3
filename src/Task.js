import React, { useState } from "react";
import "./App.css";

const Task = ({ task, deleteTask, editTask, onDragStart }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleDelete = () => {
        deleteTask(task.id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        editTask(task.id, title, description);
    };

    return (
        <div
            className="task"
            draggable={true}
            onDragStart={(e) => onDragStart(e, task.id)}
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
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default Task;