import React from "react";
import "../App.css"; 

function Task({ title, description, deadline, priority = "Low", done, markDone, deleteTask }) {

  const priorityClass = priority.toLowerCase();

  return (
    <div className="card">
      <h3>{title}</h3>
      <p><strong>Due:</strong> {deadline}</p>
      <p className="description"><em>{description}</em></p>
      
    
      <span className={`priority ${priorityClass}`}>{priority}</span>

      <br />
      <button className="doneButton" onClick={markDone}>
        {done ? <em>Undo</em> : <em>Done</em>}
      </button>
      <button className="deleteButton" onClick={deleteTask}><em>Delete</em></button>
    </div>
  );
}

export default Task;
