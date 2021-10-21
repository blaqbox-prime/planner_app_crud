import React, {useState, useEffect} from 'react'
import TaskCategory from './TaskCategory';
import {gsap} from 'gsap';

function Task({title, author, date, category, status}) {

    const [currentStatus, setCurrentStatus] = useState('incomplete');

    useEffect(()=>{
        setCurrentStatus(status);
    },[])


    const updateStatus = () => {
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
        <div className="Task" onClick={updateStatus}>
            {/* Status indicater circle on the left */}
            <div className={`Task__status ${currentStatus === 'inProgress' && 'progress'} ${currentStatus === 'completed' && 'completed'}`}></div>
            {/* content */}
            <div className="Task__content">
                <h3 className="Task__title">{title || 'untitled'}</h3>
                <p className="Task__creator-created">{`${author} - ${date}`}</p>
                <TaskCategory category={category}/>
            </div>
        </div>
    )
}

export default Task
