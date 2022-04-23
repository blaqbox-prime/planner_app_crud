import React, {useEffect} from 'react'
import "./App.css";
import "./sass/main.scss";
import {Switch, Route,Redirect} from 'react-router-dom';
import SignIn from './pages/SignIn';
import {useAuth} from './zustand/store';

import SignUp from './pages/SignUp';
import MainApp from "./components/MainApp";
import PrivateRoute from './components/PrivateRoute';
import User from './models/User';

function App() {
  const loginUser = useAuth(state => state.loginUser);

  useEffect(()=>{
    // check if local authUser exists
    const localAuthUser = JSON.parse(sessionStorage.getItem('logged_user'));
    if(localAuthUser){
      const user = new User(localAuthUser.id,localAuthUser.email,localAuthUser.firstName,localAuthUser.lastName,localAuthUser.accountType);
      loginUser(user);
    }

  },[]);
  return (
    <div className="App">
      <Switch>
          <Route path="/signin"><SignIn/></Route>
          <Route path="/signup"><SignUp/></Route>
          <Route exact path="/"><Redirect to="/app"/></Route>
          <PrivateRoute path="/app" component={MainApp}/>
      </Switch> 
    </div>
  );
}


export default App;
