import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../zustand/store'

export default function PrivateRoute({component: Component, ...rest}) {
    const loggedUser = useAuth(state => state.loggedUser);

    return (
        <Route
        {...rest}
        render={
              props => {
                 return ( loggedUser !== null ? <Component {...props}/> : <Redirect to="/signin"/>)
              }
          }
          />
           
    )
}
