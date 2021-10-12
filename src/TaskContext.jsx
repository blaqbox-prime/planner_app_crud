import React, {useContext, useState} from 'react'
import {tasks as sampleTasks} from './models/Task'

const taskContext = new React.createContext();

export function useTask(){
    return useContext(taskContext);
}


function TaskProvider({children}) {
    
    const [tasks, setTasks] = useState([]);
    const [todaysTasks, setTodaysTasks] = useState([]);

    const loadTasks = () => {
        setTasks(sampleTasks); 
        console.log('All Tasks: \n' + tasks);
    }

    const loadTodaysTasks = () => {
        if (tasks.length === 0) {
            loadTasks();
        }

        setTodaysTasks(tasks.filter(task => task.date_created === Date()));
        console.log('todays Tasks: \n' + todaysTasks );
    }

    // values
    const value = {
        tasks,
        todaysTasks,
        loadTasks,
    }

    return (
        <TaskContext value={value}>
            {children}
        </TaskContext>
    )
}

export default TaskProvider
