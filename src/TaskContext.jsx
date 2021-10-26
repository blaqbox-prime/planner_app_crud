import React, {useContext, useState} from 'react'
import Task, {tasks as sampleTasks} from './models/Task'

const TaskContext = new React.createContext();

export function useTask(){
    return useContext(TaskContext);
}


function TaskProvider({children}) {
    
    
    const [tasks, setTasks] = useState([]);
    const [todaysTasks, setTodaysTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentTask, setCurrentTask] = useState()
    const [tasksInProgress, setTasksInProgress] = useState(0);

    // Load tasks into memory
    const loadTasks = () => {
        // fetch from server
        fetch('http://localhost:3002/tasks', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
        }).then((response) => {return response.json()}).then(data => {
            let serverTasks = data.map((task) => {
                return new Task(
                    task.id,
                    sampleTasks[0].author,
                    new Date(task.date),
                    task.title,
                    task.category,
                    task.status,
                    task.deadline == null ? null : new Date(task.deadline)
                );
            })
            setTasks(serverTasks);
            console.log(serverTasks);
            initialTasksInProgress(serverTasks);
            
        }).catch((error) => {console.log(error);});
        console.log(tasks);
    }

    // set Initial Number of Tasks in progress
    const initialTasksInProgress = (tasks) => {
        const numTasks = tasks.filter(task => task.status === 'inProgress').length;
        setTasksInProgress(numTasks);
    }

    // filter today's Tasks into memory
    const loadTodaysTasks = () => {
        if (tasks.length === 0) {
            loadTasks();
        }

        setTodaysTasks(tasks.filter(task => task.date_created === Date()));
        console.log('todays Tasks: \n' + todaysTasks );
    }

    // Show and hide New Task Form
    const toggleTaskForm = ()=> {
        let value = showForm;
        setShowForm(!value);
        console.log(showForm)
    }
   
    // values
    const value = {
        tasks,
        todaysTasks,
        loadTasks,
        loadTodaysTasks,
        toggleTaskForm,
        showForm,
        tasksInProgress,
        setTasksInProgress,
        currentTask, 
        setCurrentTask
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider
