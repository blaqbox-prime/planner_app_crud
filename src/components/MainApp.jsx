import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './../pages/Dashboard';
import Tasks from './../pages/Tasks';
import Messages from './../pages/Messages';
import Appointments from './../pages/Appointments';

function MainApp() {
    return (
        <>
            <Sidebar />
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
