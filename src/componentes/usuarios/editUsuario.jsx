
import React, { useState, useEffect } from 'react'

import Swal from 'sweetalert2'
import { consultarDatabase, crearUsuario } from '../config/firebase';


export const EditarUsuarioComponent = (usuarioSeleccionado) => {

    //datos del usuario a registrar
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [perfil, setPerfil] = useState('')

    const [activo, setActivo] = useState('')

    const [nombres, setNombres] = useState('')

    const [apellidos, setApellidos] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handlePerfil = (e) => {
        setPerfil(e.target.value)
    }

    const handleActivo = (e) => {
        setActivo(e.target.value)
    }

    const handleNombres = (e) => {
        setNombres(e.target.value)
    }

    const handleApellidos = (e) => {
        setApellidos(e.target.value)
    }


    //editar y salvar los campos los usuarios en el sistema
    const editarUsuario = function (e) {
        e.preventDefault()

        const usuario = {
            email: email,
            password: password,
            perfil: perfil,
            estado: activo == 1 ? true : false,
            nombres: nombres,
            apellidos: apellidos
        }
        crearUsuario(usuario)
        console.log("guardando")


        Swal.fire({
            icon: "success",
            text: "Se ha realizado la actualización..!"
        })
        limpiarCampos()
    }

    function limpiarCampos() {
        setEmail("")
        setPassword("")
        setActivo("")
        setPerfil("")
    }


    return (

        <>

            <div class="modal fade" id="editarUsuario" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelLogout"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabelLogout">Edición de Usuarios.</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="col-lg-12">
                            <form onSubmit={editarUsuario}>
                                <div className="card mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Información del Usuario</h6>
                                    </div>
                                    <div className="card-body">
                                        <label for="email">Email</label>
                                        <input className="form-control  mb-3" type="email" required
                                            maxLength="250" id="email" value={usuarioSeleccionado.email} onChange={handleEmail}
                                            required placeholder="Email del usuario" />

                                        <label for="email">Clave de acceso</label>
                                        <input className="form-control  mb-3" type="password" onChange={handlePassword}
                                            maxLength="250" id="password" placeholder="Clave de acceso" />

                                        <label for="nombres">Nombres</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="150" id="nombres" value={usuarioSeleccionado.nombres} onChange={handleEmail}
                                            required placeholder="Email del usuario" />

                                        <label for="apellidos">Apellidos</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="152" id="apellidos" value={usuarioSeleccionado.apellidos} onChange={handleEmail}
                                            required placeholder="Email del usuario" />


                                        <div className="form-group">
                                            <label for="perfil">Perfil</label>
                                            <select className="select2-single form-control" onChange={handlePerfil}
                                                name="perfil" required id="perfil" id="perfil">
                                                <option disabled >Seleccione el perfil</option>
                                                <option value="administrador">Administrador</option>
                                                <option value="vendedor">Vendedor</option>



                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label for="estado">Estado</label>
                                            <select className="select2-single form-control" onChange={handleActivo}
                                                name="estado" required id="impuesto" id="select3Single">
                                                <option disabled >Seleccione el estado</option>
                                                <option value="1">Activo</option>
                                                <option value="0">Inactivo</option>



                                            </select>
                                        </div>




                                    </div>

                                </div>
                                <div className="col-lg-12 ">
                                    <button type="submit" className="btn btn-primary mb-4">Registrar</button>
                                </div>

                            </form>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )

}