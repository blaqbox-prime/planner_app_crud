import React, {useState, useEffect} from 'react'
import {useTask} from '../TaskContext';
import {useAppointment} from '../AppointmentContext';
import {useMessage} from '../zustand/store';


function AddButton({type}) {

    const {toggleTaskForm, setCurrentTask} = useTask();
    const {toggleAppointmentForm, setCurrentAppointment} = useAppointment();
    const [btnText, setBtnText] = useState('');
    const toggleForm = useMessage(state => state.toggleForm)
    
    // set btn text on create
    useEffect(() => {
        _buildBtnText(type);
    }, [type])

    const _buildBtnText = (type) => {
        switch (type) {
            case 'task' : return setBtnText('Add Task');
            case 'appointment' :  return setBtnText('Add Appointment');
            case 'message' : return setBtnText('Send Message')
        }
    }

    const _onClickBtnEvent = () => {
        if(type == 'task')
        {
            setCurrentTask(null); toggleTaskForm();
        }
        else if (type == 'appointment')
        {
            setCurrentAppointment(null); toggleAppointmentForm();
        }
        else{
            toggleForm();
        }
    }

    return (
        <div className="TaskList__addTask" onClick={() => _onClickBtnEvent()} >
              <h3 className="text-green">{btnText}</h3>
            </div>
    )
}

export default AddButton
