import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../zustand/store'
import User from '../models/User'

export default function PrivateRoute({component: Component, ...rest}) {
    const loggedUser = useAuth(state => state.loggedUser);
    const loginUser = useAuth(state => state.loginUser);
    
    const storedUser = localStorage.getItem("logged_user");

    const loggedIn = () => {
        console.log(storedUser);
        if(storedUser !== null){
            const data = JSON.parse(storedUser);
            const user = new User(data.id,data.email,data.firstName,data.lastName,data.accountType);
            console.log(user);
            loginUser(user);
            setTimeout(() => {
                console.log(loggedUser);
            }, 500);
            return true;
        }
        else {
            return false;
        }
    }

   const isLoggedIn = loggedIn();


    return (
        <Route
        {...rest}
        render={
              props => {
                 return ( isLoggedIn === true ? <Component {...props}/> : <Redirect to="/signin"/>)
              }
          }
          />
           
    )
}
