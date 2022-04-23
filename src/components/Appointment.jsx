import React from 'react';
import {useAppointment} from '../contexts/AppointmentContext'
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

function Appointment({id,title, author, date}) {

    const {setCurrentAppointment,toggleAppointmentForm,loadAppointments, appointments, showForm} = useAppointment();

    const editAppointment = () => {
        const appointment = appointments.find(t => t.id === id);
        console.log(appointment);
        setCurrentAppointment(appointment);
        if(!showForm) {
            toggleAppointmentForm();
        }
    }

    const deleteAppointment = () => {
        const appointment = appointments.find(t => t.id === id);
        appointment.delete();
        // Fetch new set of tasks after deleting from database; 
        setTimeout(() => {loadAppointments()}, 500);
    }
    
    return (
        <div className="rounded-container Task">
             {/* content */}
             <div className="Task__content">
                <h3 className={`Task__title`}>{title || 'untitled'}</h3>
                <p className="Task__creator-created">{`${author} - ${date}`}</p>
                <div className="deleteIconContainer">
                    <IconButton onClick={deleteAppointment}>
                        <Delete/>
                        </IconButton>
                </div>
                <div className="editIconContainer" >
                    <IconButton onClick={editAppointment}>
                        <EditIcon/>
                        </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Appointment
