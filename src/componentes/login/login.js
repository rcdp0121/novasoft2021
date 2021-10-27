import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router';
import { loginUsuario, validarUsuario } from '../config/firebase';

const LoginComponent = () => {

    //para navegar a diferentes rutas
    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    //autenticar con usuario y contraseña
    const autenticar = async function (e) {
        e.preventDefault()

        const email1 = await loginUsuario(email, password)
        if (email1) {
            const usuario = await validarUsuario("usuarios", email1.email)
            if (usuario) {
                console.log(usuario)
                Swal.fire({
                    icon: "success",
                    text: "Se ha validado el acceso..! \nUsted es un usuario " + usuario.perfil
                })

                sessionStorage.setItem("usuario", JSON.stringify(usuario))
                history.push("/home")
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Usuario no autorizado!" + email
                })
            }
        } else {
            Swal.fire({
                icon: "error",
                text: "No se ha logrado la validación!"
            })
        }

    }

    const logo = "./../images/logo.png"


    //autenticar con cuenta de gmail
    const respuestaGoogle = async (respuesta) => {
        
        if (respuesta.profileObj) {
            
            const usuario = await validarUsuario("usuarios",respuesta.profileObj.email )
            if (usuario) {
                console.log(usuario)
                Swal.fire({
                    icon: "success",
                    text: "Se ha validado el acceso..! \nUsted es un usuario " + usuario.perfil
                })

                sessionStorage.setItem("usuario", JSON.stringify(usuario))
                history.push("/home")
            } else {
                Swal.fire({
                    icon: "error",
                    text: "Usuario no autorizado!" + email
                })
            }
            
        }
    }
    /*
    const firebaseConfig = {
        apiKey: "AIzaSyC2-I3QyI3VfrCHyjAE5vK81LzCxNeCycE",
        authDomain: "misiontic2022-df733.firebaseapp.com",
        projectId: "misiontic2022-df733",
        storageBucket: "misiontic2022-df733.appspot.com",
        messagingSenderId: "883830207830",
        appId: "1:883830207830:web:cfae93fc9d5629e23f92f7",
        measurementId: "G-RWESBZBJMY"
    }
    
    
    
    
    const app = firebase.initializeApp(firebaseConfig);
    
    const auth = app.auth()
    
    const proveedor = new firebase.auth.GoogleAuthProvider()
    
    async function login(){
    
        try{
            const respuesta = await auth.signInWithPopup(proveedor)
            console.log(respuesta.user.displayName)
        }catch(error){
            
        }
    
    }
    
    
    const handleClick = () => {
        // Initialize Firebase
        //firebase.initializeApp(firebaseConfig)
        console.log("Pruebas")
    }*/






    return (
        <>
            <div className="container-login">
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-12 col-md-9">
                        <div className="card shadow-sm my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="login-form">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                                <a href="login.html" className="btn btn-google btn-block tm-4">
                                                    <img src={logo} height="100" width="100"></img>
                                                </a>
                                            </div>
                                            <form className="user" onSubmit={autenticar}>
                                                <div className="form-group ">
                                                    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address" onChange={handleEmail} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control" id="exampleInputPassword"
                                                        placeholder="Password" onChange={handlePassword} />
                                                </div>

                                                <div className="form-group">
                                                    <button className="btn btn-primary btn-block">Ingresar</button>
                                                </div>
                                                <hr />
                                                <GoogleLogin
                                                    clientId="883830207830-u0v8odt1kqnl35hipg5jfkk19v2mlaj1.apps.googleusercontent.com"
                                                    render={renderProps => (
                                                        <button className="btn btn-primary btn-block"
                                                            onClick={renderProps.onClick}
                                                            disabled={renderProps.disabled}>
                                                            Autenticarse con cuenta de Google</button>
                                                    )}
                                                    buttonText="Login"
                                                    onSuccess={respuestaGoogle}
                                                    onFailure={respuestaGoogle}
                                                    cookiePolicy={'single_host_origin'}
                                                />

                                            </form>
                                            <hr />


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginComponent