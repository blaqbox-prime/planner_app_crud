import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../zustand/store'
import User from '../models/User'

export default function PrivateRoute({component: Component, ...rest}) {
    const localAuthUser = JSON.parse(sessionStorage.getItem('logged_user'));
    const loggedUser = useAuth(state => state.loggedUser);
    const setLoggedUser = useAuth(state => state.loginUser);



    return (
        <Route
        {...rest}
        render={
              props => {
                 return ( localAuthUser ? (<Component {...props}/>) : (<Redirect to="/signin"/>))
              }
          }
          />
           
    )
}
