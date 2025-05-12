import React from 'react';

function AddTaskForm({ change, submit, formState }) {
  return (
    <form onSubmit={submit}>
      <label>
        Task title:
        <input
          type="text"
          name="title"
          value={formState.title}
          required
          onChange={(event) => change(event)}  
        />
      </label>
      <br />
      <label>
        Due date:
        <input
          type="date"
          name="deadline"
          value={formState.deadline}
          required
          onChange={(event) => change(event)} 
        />
      </label>
      <br />
      <label>
        Details:
        <input
          type="text"
          name="description"
          value={formState.description}
          onChange={(event) => change(event)}  
        />
      </label>
      <br />
      <label>
        Priority:
        <select
          name="priority"
          value={formState.priority}  
          onChange={(event) => change(event)}  
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddTaskForm;
