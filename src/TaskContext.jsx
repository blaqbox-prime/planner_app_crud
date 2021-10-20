import React, {useContext, useState} from 'react'
import Task,{tasks as sampleTasks} from './models/Task'
import {v4} from "uuid";
import {damien, kevin} from './models/User';

const TaskContext = new React.createContext();

export function useTask(){
    return useContext(TaskContext);
}
// const task_1 = {
//     id:v4(),
//     author : damien,
//     date : new Date('8 Sep, 2021'),
//     title : 'Push new workflows to github branch',
//     category: null,
//    status : 'incomplete'
// };

function TaskProvider({children}) {


    
    const [tasks, setTasks] = useState(sampleTasks);
    const [todaysTasks, setTodaysTasks] = useState([]);

    const loadTasks = () => {
        // setTasks(task_1); 
        console.log(tasks);
    }

    const loadTodaysTasks = () => {
        if (tasks.length === 0) {
            loadTasks();
        }

        setTodaysTasks(tasks.filter(task => task.date_created === Date()));
        console.log('todays Tasks: \n' + todaysTasks );
    }

    const addTask = (task) => {
        setTasks([...tasks,task]);
    }

    // values
    const value = {
        tasks,
        todaysTasks,
        loadTasks,
        loadTodaysTasks,
        addTask
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider
