import React, {useState, useEffect} from 'react'
import TaskCategory from './TaskCategory';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import useTask from '../TaskContext';

function Task({id,title, author, date, category, status}) {

    const [currentStatus, setCurrentStatus] = useState('incomplete');
    const {updateStatus} = useTask();

    useEffect(()=>{
        setCurrentStatus(status);
    },[])


    const updateStatusColor = () => {
        if(currentStatus === 'incomplete') {
            setCurrentStatus('inProgress');
        }
        if(currentStatus === 'inProgress') {
            setCurrentStatus('completed');
        }
        if(currentStatus === 'completed') {
            setCurrentStatus('incomplete');
        }
    }

    return (
        <div className="Task" onClick={updateStatusColor}>
            {/* Status indicater circle on the left */}
            <div className={`Task__status ${currentStatus === 'inProgress' && 'progress'} ${currentStatus === 'completed' && 'completed'}`}></div>
            {/* content */}
            <div className="Task__content">
                <h3 className="Task__title">{title || 'untitled'}</h3>
                <p className="Task__creator-created">{`${author} - ${date}`}</p>
                <TaskCategory category={category}/>
                <div className="deleteIconContainer">
                    <IconButton><Delete/></IconButton>
                </div>
            </div>
        </div>
    )
}

export default Task
