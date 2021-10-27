import React from 'react'
import { Redirect, Route } from 'react-router'

// const user = null;


export const RutaPrivada = ({ hasRole: rol, component: Component, ...rest }) => {


    const user = JSON.parse(sessionStorage.getItem("usuario"))



    if (!user) { return <Redirect to="/" /> }
    if ((rol && user.perfil !== rol)) { return <Redirect to="/" /> }

    return (
        <Route {...rest}>
            {
                user ?
                    <Component />
                    :
                    <Redirect to="/" />
            }
        </Route>

    )
}