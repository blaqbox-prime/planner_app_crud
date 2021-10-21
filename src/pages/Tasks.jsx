import React from 'react'
import TaskList from '../components/TaskList';

function Tasks() {

    return (
        <div className="Tasks main-container">
            <div className="Tasks__heading page_header">
            <h1 className="Tasks__title page_title">Tasks</h1>
            </div>
            <TaskList />
        </div>
    )
}

export default Tasks
