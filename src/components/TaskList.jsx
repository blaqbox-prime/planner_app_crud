import React from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

const TaskList = () => {
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
        </div>
    )
}

export default TaskList
