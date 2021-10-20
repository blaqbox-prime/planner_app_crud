import React, {useState, useEffect} from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {useTask} from '../TaskContext';
import Task from './Task'

const TaskList = () => {

    const {loadTasks, tasks} = useTask();

    useEffect(() => {
        console.log(new Date().getDate());
        loadTasks();
        // console.log('Loading tasks...')
    },[])
    // date={task.getFormattedDate()}

    return (
        <div className="TaskList">
            {/* task list Title */}
            <h2 className="TaskList__title">Task List</h2>
            
            {/* tasks in progress */}
            <div className="TaskList__inProgress">
            <DonutLargeIcon sx={{color: '#5c6165'}}/>
            <p>In Progress</p>
            <h3 className="TaskList__inProgressCount">3</h3>
            </div>
            {/* Add Task Button */}
            <div className="TaskList__addTask">
              <h3 className="text-green">Add Task</h3>
            </div>
            {/* List of tasks */}
            {
        tasks.map(task => 
            <Task key={task.id} title={task.title} author={task.author.getFullName()} date={task.getFormattedDate()} status={task.status} category={task.category}/>
        )
    }        </div>
    )
}

export default TaskList
