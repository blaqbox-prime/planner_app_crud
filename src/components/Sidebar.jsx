import React from 'react'
import AccountTile from './AccountTile'
import InboxIcon from '../svg/inbox.svg'; 
import CalendarIcon from '../svg/calendar.svg'; 
import IconTile from './IconTile'
import Channel from './Channel';
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {useAuth} from '../zustand/store';

function Sidebar({closed}) {
    const authUser = useAuth(state => state.loggedUser);
    return (
        <div className={`Sidebar ${closed && 'Sidebar__closed'}`}>
           <div className="Sidebar__header">
            <h1 className="Sidebar__title">Plan <span className="text-green">Out</span></h1>
           <IconButton className="Sidebar__closeIcon" id='Sidebar__closeIcon'>
                <CloseIcon />
            </IconButton>
           </div>
            <AccountTile user={authUser}/>

            <IconTile icon={InboxIcon} title='Inbox'/>
            <IconTile icon={CalendarIcon} title='Today'/>
            
            <hr />

            <Channel/>
            <Button className="Sidebar__addButton">
                <AddIcon className="Sidebar__addIcon" sx={{color: "#09827D"}}/>
                <h3 className="text-green">Add Channel</h3>
            </Button>
        </div>
    )
}

export default Sidebar

