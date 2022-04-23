import React, { useState, useRef, useLayoutEffect } from "react";
import {damien, victor, richard, kevin} from '../models/User';
import {gsap} from 'gsap';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useMessage } from './../zustand/store';
import Message from '../models/Message';
import { v4 } from "uuid";




function MessageForm() {
  const [message, setMessage] = useState('');
  const toggleForm = useMessage(state => state.toggleForm)
  const addMessage = useMessage(state => state.addMessage)
  const messages = useMessage(state => state.messages)

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
   setTimeout(() => {console.log(messages);}, 1000);
   try{
     const newMessage = new Message(
       v4(),
       message,
       kevin,
       getRecipientFromSelect(),
       new Date(),
       );
       
       newMessage.send();
       addMessage(newMessage);
    }
    catch(err){ console.log(err); }

    // clear message
    setMessage('');
  }

  const getRecipientFromSelect = () => {
    // Get Recipient value
    let select = document.getElementById('recipients');
    return select.options[select.selectedIndex].value;
}

  const accounts = [damien, victor, richard];

  function _buildRecipientList(){
    return (accounts.map((acc,idx) => {
      if(idx === 0) return <option value={acc.id} selected> {acc.getFullName()} </option>
      else
      return <option value={acc.id}> {acc.getFullName()} </option>
    }));
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
      <div className="form-group">
        <label for="creator">Recipient</label>
        <select name="recipients" id="recipients" className="form-control">
          {_buildRecipientList()}
        </select>
      </div>

      <button className="btn TaskForm__btn form-control" onClick={sendMessage}>Send Message</button>
    </form>
  );
}

export default MessageForm;
