import React, { useState } from "react";
import "./App.css";

const Task = ({ task, moveTask, deleteTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [currentBoard, setCurrentBoard] = useState(null)
    const [currentTsk, setCurrentTask] = useState(null)

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

    function DragOverHandler(e) {
        e.preventDefault()
        if(e.target.className == 'task'){
            e.target.style.boxShadow = ' 0 2px 3px gray'
        }

    }

    function DragLEaveHandler(e) {
        e.target.style.boxShadow = ' none'

    }

    function DragStartHandler(e, container, task) {
        setCurrentBoard(container)
        setCurrentTask(task)

    }

    function DragEndHandler(e) {
        e.target.style.boxShadow = ' none'


    }

    function dropHandler(e, container, task) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentTsk)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = container.items.indexOf(task)
        container.items.splice(dropIndex + 1, 0, currentTsk)
        setCurrentBoard(container.map(b => {
            
        }))

    }

    return (
        <div className="task"
             onDragOver={(e) => DragOverHandler(e)}
             onDragLeave={e => DragLEaveHandler(e)}
             onDragStart={(e) => DragStartHandler(e, task.status, task)}
             onDragEnd={(e)=> DragEndHandler(e)}
             onDrop={(e) => dropHandler(e, task.status, task)}
             draggable = {true}>
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