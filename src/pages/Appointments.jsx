import React, {useRef, useEffect} from 'react'
import AddButton from '../components/AddButton'
import {useAppointment} from '../AppointmentContext'
import List from '../components/List'

function Appointments() {

    const {loadAppointments, appointments, showForm, toggleAppointmentForm, currentAppointment, setCurrentAppointment} = useAppointment();
    const tl = useRef()

        // Run once on mount
        useEffect(()=>{
            loadAppointments();
        },[])
        
        // re-render on Appointments update
        useEffect(()=>{},[appointments]);

    return (
        <div className="Appointments main-container">
            <div className="Appointments__heading page_header">
            <h1 className="Appointments__title page_title">Appointments</h1>
            </div>
            <AddButton type="appointment"/>
            {appointments && <List type="appointments"/>}
        </div>
    )
}

export default Appointments
