import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import {gsap} from 'gsap';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMessage } from './../zustand/store';



function MessageForm() {
  const [message, setMessage] = useState('');
  const toggleForm = useMessage(state => state.toggleForm)
  const addMessage = useMessage(state => state.addMessage)
  const messages = useMessage(state => state.messages)

  const el = useRef();
  const tl = useRef();


  useLayoutEffect(()=>{
    // animations
    tl.current = gsap.timeline()
    .from(".TaskForm",{y: -35, opacity: 0, duration: 1})
    .from(".form-group",{y:-25, opacity: 0, duration: .5, stagger: .3})
    .from(".TaskForm__btn", {opacity: 0, duration: .25})
  },[])



  const updateMessage = (e) => {
    let value = e.target.value;
    setMessage(value);
  }

  const sendMessage = (e) => {
   e.preventDefault();

   if(message === '' ) return
    addMessage(message);
    setTimeout(() => {console.log(messages);}, 1000);

    // clear message
    setMessage('');
  }


  return (
    <form className="TaskForm" autoComplete="off">
      {/* close btn */}
      <IconButton className="TaskForm__close" onClick={() => {toggleForm()}}><CloseIcon/></IconButton>
      <div className="form-group">
        <label for="title">{`New Message`}</label>
        <input
          type="text"
          className="form-control"
          placeholder="Send a message"
          value={message}
          onChange={updateMessage}
          required
        />
      </div>
      
    {/* =================================== Select Recipient (Temporarily send to group)*/}
      {/* <div className="form-group">
        <label for="creator">Creator</label>
        <div className="TaskForm__creator">
          <AccountTile noIcon={true} user={currentTask && currentTask.author}/>
        </div>
      </div> */}

      <button className="btn TaskForm__btn form-control" onClick={sendMessage}>Send Message</button>
    </form>
  );
}

export default MessageForm;
