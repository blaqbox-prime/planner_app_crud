import React, { useState } from "react";
import AccountTile from "./AccountTile";
import TaskCategory from "./TaskCategory";
function TaskForm() {
  const [task, setTask] = useState("");

  const updateTask = (e) => {
    const value = e.target.value;
    setTask(value);
  };

  return (
    <form className="TaskForm" autoComplete="off">
      <div className="form-group">
        <label for="title">New Task</label>
        <input
          type="text"
          className="form-control"
          placeholder="What task needs to be done?"
          value={task}
          onChange={updateTask}
          required
        />
      </div>
      <div className="form-group">
        <label for="category">Category</label>
        <select className="TaskForm__category form-control" name='categories'>
          <option value="Design">Design</option>
          <option value="Functionality">Functionality</option>
        </select>
      </div>

      <div className="form-group">
        <label for="creator">Creator</label>
        <div className="TaskForm__creator">
          <AccountTile noIcon={true} />
        </div>
      </div>
      <button className="btn TaskForm__btn form-control">Create Task</button>
    </form>
  );
}

export default TaskForm;
