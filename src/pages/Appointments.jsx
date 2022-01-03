import React, {useRef, useEffect} from 'react'
import AddButton from '../components/AddButton'
import {useAppointment} from '../AppointmentContext'
import Appointment from '../components/Appointment'
import AppointmentForm from './../components/AppointmentForm';
import { useLayoutEffect } from 'react';
import gsap from 'gsap'

function Appointments() {

    const {loadAppointments, appointments, showForm, currentAppointment} = useAppointment();
    const tl = useRef();

        // Run once on mount
        useEffect(()=>{
            loadAppointments();
        },[])
        
        
        // re-render on Appointments update
        useEffect(()=>{
            console.log(appointments);
        },[appointments]);

        useLayoutEffect(()=>{
            tl.current = gsap.timeline()
            .from(".Task", {duration: .3, y: -25, opacity: 0, stagger: .5})
        },[appointments])

    return (
        <div className="Appointments main-container">
            {showForm && <AppointmentForm currentAppointment={currentAppointment}/>}
            <div className="Appointments__heading page_header">
                <h1 className="Appointments__title page_title">Appointments</h1>
            </div>
            <AddButton type="appointment"/>

            {appointments && appointments.map(appointment => 
                    <Appointment key={appointment.id} id={appointment.id} title={appointment.title} author={appointment.author.getFullName()} date={appointment.getFormattedDate()} />
                    )}
        </div>
    )
}

export default Appointments
