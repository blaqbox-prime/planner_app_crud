import React, {useContext, useState} from 'react'
import Task,{tasks as sampleTasks} from './models/Task'


const TaskContext = new React.createContext();

export function useTask(){
    return useContext(TaskContext);
}


function TaskProvider({children}) {


    
    const [tasks, setTasks] = useState([]);
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [showForm, setShowForm] = useState(true);
    const [tasksInProgress, setTasksInProgress] = useState(0);

    // Load tasks into memory
    const loadTasks = () => {
        setTasks(sampleTasks);
        console.log(tasks);
    }

    // filter today's Tasks into memory
    const loadTodaysTasks = () => {
        if (tasks.length === 0) {
            loadTasks();
        }

        setTodaysTasks(tasks.filter(task => task.date_created === Date()));
        console.log('todays Tasks: \n' + todaysTasks );
    }

    // Create a new Task
    const addTask = (task) => {
        setTasks([...tasks,task]);
    }

    // Show and hide New Task Form
    const toggleTaskForm = ()=> {
        let value = showForm;
        setShowForm(!value);
        console.log(showForm)
    }
    // updateStatus
    const updateStatus = (id) => {
        const task = tasks.filter(task => task.id === id);
        if(task.status === 'incomplete') {
            task.status = 'inProgress';
        }
        if(task.status === 'inProgress') {
            task.status = 'completed';
        }
        if(task.status === 'completed') {
            task.status = 'incomplete';
        }
    console.log(tasks.findIndex(task.id == id));
    }

    // values
    const value = {
        tasks,
        todaysTasks,
        loadTasks,
        loadTodaysTasks,
        addTask,
        toggleTaskForm,
        showForm,
        tasksInProgress,
        updateStatus,
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider
