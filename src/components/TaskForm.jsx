import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import AccountTile from "./AccountTile";
import TaskCategory from "./TaskCategory";
import {useTask} from '../TaskContext';
import Task from '../models/Task';
import {v4} from "uuid";
import {damien, kevin} from '../models/User';
import {gsap} from 'gsap';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



function TaskForm({close}) {
  const [task, setTask] = useState("");
  const {addTask} = useTask();
  const el = useRef();
  const q = gsap.utils.selector(el);
  const tl = useRef();

  useLayoutEffect(()=>{
    // animations
    tl.current = gsap.timeline()
    .from(".TaskForm",{y: -35, opacity: 0, duration: 1})
    .from(".form-group",{y:-25, opacity: 0, duration: .5, stagger: .3})
    .from(".TaskForm__btn", {opacity: 0, duration: .25})
  },[])

  const updateTask = (e) => {
    const value = e.target.value;
    setTask(value);
  };

  const saveTask = (e) => {
    // get category value

    if(task === '') return;

    let select = document.getElementById('categories');
    let category = select.options[select.selectedIndex].value;

    // create a task instance
    let newTask = new Task(
      v4(),
      kevin,
      new Date(),
      task,
      category,
      'incomplete'
    );

    // add task to existing tasksTitle
    addTask(newTask);
    
    setTask(''); //reset task field
  }

  return (
    <form className="TaskForm" autoComplete="off">
      {/* close btn */}
      <IconButton className="TaskForm__close" onclick={close}><CloseIcon/></IconButton>
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
        <select className="TaskForm__category form-control" name='categories' id='categories'>
          <option value="design">Design</option>
          <option value="functionality">Functionality</option>
        </select>
      </div>

      <div className="form-group">
        <label for="creator">Creator</label>
        <div className="TaskForm__creator">
          <AccountTile noIcon={true} />
        </div>
      </div>
      <button className="btn TaskForm__btn form-control" onClick={saveTask}>Create Task</button>
    </form>
  );
}

export default TaskForm;
