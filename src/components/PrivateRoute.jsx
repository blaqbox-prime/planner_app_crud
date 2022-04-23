import React, {useState, useEffect} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../contexts/authContext'
import User from '../models/User'

export default function PrivateRoute({component: Component, ...rest}) {
    const {authUser} = useAuth();

    return (
        <Route
        {...rest}
        render={
              props => {
                 return ( authUser ? (<Component {...props}/>) : (<Redirect to="/signin"/>))
              }
          }
          />
           
    )
}
