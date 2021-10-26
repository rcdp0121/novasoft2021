import React from 'react'
import { useHistory } from 'react-router';
import { logOutUsuario } from './../config/firebase';


const NavBarComponent = () => {
    //para navegar a diferentes rutas
    const history = useHistory()

    const usuario = JSON.parse(sessionStorage.getItem("usuario"))


    const cerrarSession = () => {
        logOutUsuario()
        history.push("/")
    }

    return (
        <>
            <div id="wrapper">


                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
                            <button id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>
                            <ul className="navbar-nav ml-auto">




                                <div className="topbar-divider d-none d-sm-block"></div>
                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-user-circle-o" ></i>
                                        <span className="ml-2 d-none d-lg-inline text-white small">{usuario.nombres} {usuario.apellidos}</span>
                                        <button onClick={cerrarSession} className="btn btn-warnings">Salir</button>
                                    </a>

                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NavBarComponent