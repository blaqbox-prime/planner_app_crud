import React from 'react'
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function Tasks() {
    return (
        <div className="Tasks main-container">
            <div className="Tasks__heading page_header">
            <h1 className="Tasks__title">Tasks</h1>
            </div>
            <TaskList />
            <TaskForm/>
            
        </div>
    )
}

export default Tasks
