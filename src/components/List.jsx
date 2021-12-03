import React from 'react'
import Task from './Task';
import Appointment from './Appointment'
import {useTask} from '../TaskContext'
import {useAppointment} from '../AppointmentContext'

function List({type}) {

    const {tasks} = useTask();
    const {appointments} = useAppointment();

    const _buildList = () => {

            if(type === 'tasks'){tasks && tasks.map(task => 
                <Task className="List__item" key={task.id} id={task.id} title={task.title} author={task.author.getFullName()} date={task.getFormattedDate()} status={task.status} category={task.category} />
            )} else {
                appointments && appointments.map(appointment => <Appointment className="List__item" key={appointment.id} id={appointment.id} title={appointment.title} author={appointment.author.getFullName()} date={appointment.getFormattedDate()} />)
            }
    }

    return (
        <div>
            {_buildList()}
        </div>
    )
}

export default List
