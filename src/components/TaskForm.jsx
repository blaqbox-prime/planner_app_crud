import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import AccountTile from "./AccountTile";
import {useTask} from '../TaskContext';
import Task from '../models/Task';
import {v4} from "uuid";
import { kevin} from '../models/User';
import {gsap} from 'gsap';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



function TaskForm({currentTask}) {
  const [title, setTitle] = useState("");
  const {toggleTaskForm, setCurrentTask, loadTasks} = useTask();
  const el = useRef();
  const tl = useRef();

  useEffect(()=>{
    if(currentTask){
      setTitle(currentTask.title);
    }
  },[currentTask])

  useLayoutEffect(()=>{
    // animations
    tl.current = gsap.timeline()
    .from(".TaskForm",{y: -35, opacity: 0, duration: 1})
    .from(".form-group",{y:-25, opacity: 0, duration: .5, stagger: .3})
    .from(".TaskForm__btn", {opacity: 0, duration: .25})
  },[])

  const updateTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const createTask = () => {
       // create a task instance
       let newTask = new Task(
        v4(),
        kevin,
        new Date(),
        title,
        getCategoryFromSelect(),
        'incomplete'
      );  

    // add task to existing tasks 
    try{
      newTask.create();
    }
    catch(err){
      console.log(err);
    }
     
  }

  const getCategoryFromSelect = () => {
       // Get Category value
       let select = document.getElementById('categories');
       return select.options[select.selectedIndex].value;
  }

  const updateTask = () => {
    let updatedTask = new Task(
      currentTask.id,
      currentTask.author, 
      currentTask.date_created, 
      title,
      getCategoryFromSelect(),
      currentTask.status
    );

    updatedTask.update();
  }

  const saveTask = (e) => {
    if(title === '') return;

    if(currentTask){
      updateTask();

    }
    else{
      createTask()
    }

    loadTasks();
    setCurrentTask(null);
    setTitle(''); //reset task field
  }

  // Available Task Categories
  const CATEGORIES = ['none','personal','design','functionality'];

  const _buildCategoryOptions = () => {
    let selected = 0;
    currentTask ? selected = CATEGORIES.findIndex(category => category === currentTask.category) : selected = 0; //if currentCategory is passed in, set selected to task category
    return(
      CATEGORIES.map((category,idx) => {
        if(idx === selected){
         return <option key={idx} value={category} selected >{`${category[0].toUpperCase()}${category.slice(1)}`}</option>
        }else{
        return  <option key={idx} value={category}>{`${category[0].toUpperCase()}${category.slice(1)}`}</option>
        }
      })
      )
  }

  return (
    <form className="TaskForm" autoComplete="off">
      {/* close btn */}
      <IconButton className="TaskForm__close" onClick={() => {toggleTaskForm(); setCurrentTask(null);}}><CloseIcon/></IconButton>
      <div className="form-group">
        <label for="title">{currentTask ? 'Edit Task' : `New Task`}</label>
        <input
          type="text"
          className="form-control"
          placeholder="What task needs to be done?"
          value={title}
          onChange={updateTitle}
          required
        />
      </div>
      <div className="form-group">
        <label for="category">Category</label>
        <select className="TaskForm__category form-control" name='categories' id='categories'>
          {_buildCategoryOptions()}
        </select>
      </div>

      <div className="form-group">
        <label for="creator">Creator</label>
        <div className="TaskForm__creator">
          <AccountTile noIcon={true} user={currentTask && currentTask.author}/>
        </div>
      </div>
      <button className="btn TaskForm__btn form-control" onClick={saveTask}>{currentTask ? 'Update Task' : 'Create Task'}</button>
    </form>
  );
}

export default TaskForm;
