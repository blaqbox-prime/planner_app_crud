import React, {useEffect} from 'react'
import AccountTile from './AccountTile'
import InboxIcon from '../svg/inbox.svg'; 
import CalendarIcon from '../svg/calendar.svg'; 
import IconTile from './IconTile'
import Channel from './Channel';
import AddIcon from '@mui/icons-material/Add';
import { Button} from '@mui/material';
import {useAuth} from '../zustand/store';

function Sidebar({closed}) {
    const authUser = useAuth(state => state.loggedUser);
    useEffect(() => {
        
    }, [closed])
    
    
    return (
        <div className={`Sidebar ${closed && 'Sidebar__closed'}`} id="Sidebar">
           <div className="Sidebar__header">
            <h1 className="Sidebar__title">Plan <span className="text-green">Out</span></h1>
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

