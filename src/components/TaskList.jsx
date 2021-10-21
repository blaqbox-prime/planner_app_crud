import React, {useState, useEffect} from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {useTask} from '../TaskContext';
import Task from './Task'
import TaskForm from './TaskForm';
import {gsap} from 'gsap';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';

const TaskList = () => {

    const {loadTasks, tasks, showForm, toggleTaskForm} = useTask();
    const tl = useRef()

    useLayoutEffect(() => {

    },[showForm])
    
    useLayoutEffect(()=>{
        loadTasks();
        tl.current = gsap.timeline()
        .from(".Task", {duration: .6, y: -25, opacity: 0, stagger: .5})
    },[])


    return (
        <div className="TaskList">
            {showForm && <TaskForm/>}
            {/* task list Title */}
            <h2 className="TaskList__title">Task List</h2>
            
            {/* tasks in progress */}
            <div className="TaskList__inProgress">
            <DonutLargeIcon sx={{color: '#5c6165'}}/>
            <p>In Progress</p>
            <h3 className="TaskList__inProgressCount">3</h3>
            </div>
            {/* Add Task Button */}
            <div className="TaskList__addTask" onClick={() => toggleTaskForm()} >
              <h3 className="text-green">Add Task</h3>
            </div>
            {/* List of tasks */}
            {
        tasks.map(task => 
            <Task key={task.id} id={task.id} title={task.title} author={task.author.getFullName()} date={task.getFormattedDate()} status={task.status} category={task.category}/>
        )
    }        </div>
    )
}

export default TaskList

export const EmptyTaskList = () => {
    return (
        <div className="EmptyTaskList">
            <img src="" alt="empty list" />
        </div>
    )
}
