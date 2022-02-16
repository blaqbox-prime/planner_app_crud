import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import AccountTile from "./AccountTile";
import {useAppointment} from '../AppointmentContext';
import Appointment from '../models/Appointment';
import {v4} from "uuid";
import { kevin} from '../models/User';
import {gsap} from 'gsap';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useAuth} from '../zustand/store';

function AppointmentForm({currentAppointment}) {

  const [title, setTitle] = useState("");
  const [day, setday] = useState("");
  const {toggleAppointmentForm, setCurrentAppointment, loadAppointments} = useAppointment();
  const tl = useRef();
  const authUser = useAuth(state => state.loggedUser);

  useEffect(()=>{
    if(currentAppointment){
      setTitle(currentAppointment.title);
    }
  },[currentAppointment])

  useLayoutEffect(()=>{
    // animations
    tl.current = gsap.timeline()
    .from(".TaskForm",{y: -35, opacity: 0, duration: 1})
    .from(".form-group",{y:-25, opacity: 0, duration: .5, stagger: .3})
    .from(".TaskForm__btn", {opacity: 0, duration: .25})
  },[])

  const updateTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const updateDay = (e) => {
    const value = e.target.value;
    setday(value);
  };

  const createAppointment = () => {
       // create a Appointment instance
       let newAppointment = new Appointment(
        v4(),
        kevin,
        title,
        day,
      );  

    // add appointment to existing data 
    try{
      newAppointment.create();
    }
    catch(err){
      console.log(err);
    }
     
  }

  const updateAppointment = () => {
    let updatedAppointment = new Appointment(
      currentAppointment.id,
      currentAppointment.author, 
      title,
      day,
    );

    updatedAppointment.update();
  }

  const saveAppointment = (e) => {
    e.preventDefault();
    if(title === '') return;

    if(currentAppointment){
      updateAppointment();

    }
    else{
      createAppointment()
    }

    loadAppointments();
    setCurrentAppointment(null);
    setTitle(''); //reset Appointment field
  }

    return (
        <form className="TaskForm" autoComplete="off">
      {/* close btn */}
      <IconButton className="TaskForm__close" onClick={() => {toggleAppointmentForm(); setCurrentAppointment(null);}}><CloseIcon/></IconButton>
      <div className="form-group">
        <label for="title">{currentAppointment ? 'Edit Appointment' : `New Appointment`}</label>
        <input
          type="text"
          className="form-control"
          placeholder="What is your next appointment?"
          value={title}
          onChange={updateTitle}
          required
        />
      </div>
      <div className="form-group">
        <label for="day">Appointment date</label>
        <input
          type="date"
          className="form-control"
          value={day}
          onChange={updateDay}
          required
        />
      </div>

      <div className="form-group">
        <label for="creator">Creator</label>
        <div className="TaskForm__creator">
          <AccountTile noIcon={true} user={currentAppointment ? currentAppointment.author : authUser}/>
        </div>
      </div>
      <button className="btn TaskForm__btn form-control" onClick={saveAppointment}>{currentAppointment ? 'Update Appointment' : 'Create Appointment'}</button>
    </form>
    )
}

export default AppointmentForm
