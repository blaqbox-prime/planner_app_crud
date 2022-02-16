import React, {useContext, useState} from 'react'
import Appointment, {appointments as sampleAppointments} from './models/Appointment';

const AppointmentContext = new React.createContext();

export function useAppointment(){
    return useContext(AppointmentContext);
}


function AppointmentProvider({children}) {
    
    
    const [appointments, setAppointments] = useState([]);
    const [todaysAppointments, setTodaysAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentAppointment, setCurrentAppointment] = useState()

    // Load tasks into memory
    const loadAppointments = (authUser) => {
        // fetch from server
        fetch('http://localhost:3002/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({userId: authUser.id})
        }).then((response) => {return response.json()}).then(data => {
            let serverAppointments = data.map((appointment) => {
                return new Appointment(
                    appointment.id,
                    authUser,
                    appointment.title,
                    new Date(appointment.date),
                );
            })
            setAppointments(serverAppointments);
            console.log(serverAppointments);
            
        }).catch((error) => {console.log(error);});
    }

    // filter today's Tasks into memory
    const loadTodaysAppointments = () => {
        if (appointments.length === 0) {
            loadAppointments();
        }

        setTodaysAppointments(appointments.filter(appointment => appointment.date === new Date()));
        console.log('todays Appointments: \n' + todaysAppointments );
    }

    // Show and hide New Appointment Form
    const toggleAppointmentForm = ()=> {
        let value = showForm;
        setShowForm(!value);
        console.log(showForm)
    }
   
    // values
    const value = {
        appointments,
        todaysAppointments,
        loadAppointments,
        loadTodaysAppointments,
        toggleAppointmentForm,
        showForm,
        currentAppointment, 
        setCurrentAppointment
    }

    return (
        <AppointmentContext.Provider value={value}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentProvider
