import React from 'react'
import TaskCategory from './TaskCategory';

function Task({title, author, date, category, status}) {
    return (
        <div className="Task">
            {/* Status indicater circle on the left */}
            <div className={`Task__status ${status === 'inProgress' && 'progress'} ${status === 'completed' && 'completed'}`}></div>
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
