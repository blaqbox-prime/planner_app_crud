import React from 'react'
import {useTask} from '../TaskContext';


function AddButton({type}) {

    const {toggleTaskForm, setCurrentTask} = useTask();
    
    const _onClickBtnEvent = () => {
        if(type == 'task')
        {
            setCurrentTask(null); toggleTaskForm();
        }
        else
        {}
    }

    return (
        <div className="TaskList__addTask" onClick={() => _onClickBtnEvent()} >
              <h3 className="text-green">{type == 'task' ? 'Add Task' : "Add Appointment"}</h3>
            </div>
    )
}

export default AddButton
