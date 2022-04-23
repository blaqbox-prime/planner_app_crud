import React, {useState} from 'react'
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Dashboard from './../pages/Dashboard';
import Tasks from './../pages/Tasks';
import Messages from './../pages/Messages';
import Appointments from './../pages/Appointments';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

function MainApp() {
    const [isClosed, setIsClosed] = useState(true);
    
    function handleClick(){
        console.log(isClosed);
        setIsClosed(!isClosed);
        console.log(isClosed);
    }

    return (
        <div className="MainApp">
            <Sidebar closed={isClosed}/>
            <button onClick={handleClick} id="menu-icon">
                {isClosed ? (<MenuIcon sx={{fontSize: 28}}/>) : (<CloseIcon sx={{fontSize: 28}}/>)}
            </button>
            <main className="App__main">
            <Switch>
                <Route exact path="/app"><Redirect to="/app/dashboard"/></Route> 
                <Route path="/app/dashboard"><Dashboard/></Route>
                <Route path="/app/tasks"><Tasks /></Route>
                <Route path="/app/messages"><Messages /></Route>
                <Route path="/app/appointments"><Appointments /></Route>
            </Switch>
          </main>
        </div>
    )
}

export default MainApp
