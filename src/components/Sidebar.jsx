import React from 'react'
import AccountTile from './AccountTile'
import InboxIcon from '../svg/inbox.svg'; 
import CalendarIcon from '../svg/calendar.svg'; 

function Sidebar() {
    return (
        <div className="Sidebar">
            <h1 className="Sidebar__title">Plan <span className="text-green">Out</span></h1>
            <AccountTile/>
            <div className="Sidebar__icon-tile">
                <img src={InboxIcon} alt="Inbox Icon" className="Sidebar__icon"/>
                <p>Inbox</p>
            </div>
            <div className="Sidebar__icon-tile">
            <img src={CalendarIcon} alt="Inbox Icon" className="Sidebar__icon"/>
                <p>Today</p>
            </div>
            <hr />
        </div>
    )
}

export default Sidebar

