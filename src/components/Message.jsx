import React from "react";
import { kevin} from '../models/User';

function Message({message, author, date}) {
  return (
    <div className="rounded-container Task">
      {/* content */}
      <div className="Task__content">
        <p style={{color: 'black'}}>{message}</p>
        <p className="Task__creator-created">{`${kevin.getFullName()} - ${date}`}</p>
      </div>
    </div>
  );
}

export default Message;
