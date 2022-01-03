import React, {useEffect} from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {useTask} from '../TaskContext';
import Task from './Task'
import TaskForm from './TaskForm';
import {gsap} from 'gsap';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import AddButton from './AddButton';

const TaskList = () => {

    const {loadTasks, tasks, showForm,  currentTask ,tasksInProgress} = useTask();
    const tl = useRef()

    // Run once on mount
    useEffect(()=>{
        loadTasks();
    },[])
    
    // re-render on tasks update
    useEffect(()=>{},[tasks]);


    useLayoutEffect(()=>{
        tl.current = gsap.timeline()
        .from(".Task", {duration: .3, y: -25, opacity: 0, stagger: .5})
    },[tasks])

    // for proper Form animation
    useLayoutEffect(() => {

    },[showForm])
    


    return (
        <div className="TaskList">
            {showForm && <TaskForm currentTask={currentTask}/>}
            {/* task list Title */}
            <h2 className="TaskList__title">Task List</h2>
            
            {/* tasks in progress */}
            <div className="TaskList__inProgress">
            <DonutLargeIcon sx={{color: '#5c6165'}}/>
            <p>In Progress</p>
            <h3 className="TaskList__inProgressCount">{tasksInProgress}</h3>
            </div>
            {/* Add Task Button */}
            <AddButton type="task"/>
            {/* List of tasks */}
            {
        tasks && tasks.map(task => 
            <Task key={task.id} id={task.id} title={task.title} author={task.author.getFullName()} date={task.getFormattedDate()} status={task.status} category={task.category} />
        )
        }
        { (tasks === undefined || tasks.length === 0 || !tasks) && <EmptyTaskList />}
    </div>
    )
}

export default TaskList

export const EmptyTaskList = () => {

    let tl = useRef();

    useLayoutEffect(()=>{
        tl.current = gsap.timeline()
        .from(".EmptyTaskList", {duration: .3, y: 25, opacity: 0});
        return () => {
            tl.current.reverse();
        }
    },[])

    return (
        <div className="EmptyTaskList">
            <img src="/images/todos-empty.png" alt="empty list" />
            <h1>Looks like you have nothing to do...</h1>
        </div>
    )
}
