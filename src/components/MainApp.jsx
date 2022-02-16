import React, {useEffect, useRef} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './../pages/Dashboard';
import Tasks from './../pages/Tasks';
import Messages from './../pages/Messages';
import Appointments from './../pages/Appointments';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

function MainApp() {


    const openDrawer = () => {
        // const sidebar = document.getElementById('Sidebar');
        // sidebar.style.width = '100%';
        console.log("sidebar");
    }

    return (
        <>
            <Sidebar />
            <MenuIcon sx={{fontSize: 28}} id="menu-icon" onClick={ () => {alert("this button works")}}/>
            <main className="App__main">
            <Switch>
                <Route exact path="/app"><Redirect to="/app/dashboard"/></Route> 
                <Route path="/app/dashboard"><Dashboard/></Route>
                <Route path="/app/tasks"><Tasks /></Route>
                <Route path="/app/messages"><Messages /></Route>
                <Route path="/app/appointments"><Appointments /></Route>
            </Switch>
          </main>
        </>
    )
}

export default MainApp
