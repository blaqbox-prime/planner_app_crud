import React, {useContext, useState} from 'react'
import {tasks as sampleTasks} from './models/Task'

const TaskContext = new React.createContext();

export function useTask(){
    return useContext(TaskContext);
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
        loadTodaysTasks
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider
