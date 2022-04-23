import React, {useState, useEffect} from 'react'
import TaskCategory from './TaskCategory';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useTask} from '../contexts/TaskContext';
import {useAuth} from '../zustand/store';

function Task({id,title, author, date, category, status}) {

    const [currentStatus, setCurrentStatus] = useState('incomplete');
    const {tasks, setCurrentTask, toggleTaskForm, showForm, loadTasks,setTasksInProgress, tasksInProgress} = useTask();
    const authUser = useAuth(state => state.loggedUser);

    useEffect(()=>{
        setCurrentStatus(status);
    },[])

    const editTask = () => {
        const task = tasks.find(t => t.id === id);
        console.log(task);
        setCurrentTask(task);
        if(!showForm) {
            toggleTaskForm();
        }
    }

    const updateStatusColor = () => {

        const task = tasks.find(t => t.id === id);

        if(currentStatus === 'incomplete') {
            setCurrentStatus('inProgress');
            setTasksInProgress(tasksInProgress+1);
            task.updateStatus('inProgress');

        }
        if(currentStatus === 'inProgress') {
            setCurrentStatus('completed');
            setTasksInProgress(tasksInProgress-1);
            task.updateStatus('completed');
        }
        if(currentStatus === 'completed') {
            setCurrentStatus('incomplete');
            task.updateStatus('incomplete');
        }
    }

    const deleteTask = () => {
        const task = tasks.find(t => t.id === id);
        task.delete();
        // Fetch new set of tasks after deleting from database; 
        setTimeout(() => {loadTasks(authUser)}, 500);
    }

    return (
        <div className={`Task rounded-container`}>
            {/* Status indicater circle on the left */}
            <div className={`Task__status ${currentStatus === 'inProgress' && 'progress'} ${currentStatus === 'completed' && 'completed'}` } onClick={updateStatusColor}></div>
            {/* content */}
            <div className="Task__content">
                <h3 className={`Task__title ${currentStatus === 'completed' && 'completed'}`}>{title || 'untitled'}</h3>
                <p className="Task__creator-created">{`${author} - ${date}`}</p>
                <TaskCategory category={category}/>
                <div className="deleteIconContainer">
                    <IconButton onClick={deleteTask}>
                        <Delete/>
                        </IconButton>
                </div>
                <div className="editIconContainer" >
                    <IconButton onClick={editTask}>
                        <EditIcon/>
                        </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Task
