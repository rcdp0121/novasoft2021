import NavBarComponent from '../home/menuSuperior';
import MenuComponent from '../home/menu';
import React, { useState, useEffect } from 'react'

import Swal from 'sweetalert2'
import { actualizarDocumentoDatabase, consultarDatabase, crearUsuario, editarUsuarios } from '../config/firebase';
import { EditarUsuarioComponent } from './editUsuario';



const GestionUsuariosComponent = () => {



    let [usuarioSeleccionado, setUsuarioSeleccionado] = useState()

    let [data, setData] = useState([]);

    //datos del usuario a registrar

    const [id, setId] = useState('')

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


    useEffect(() => {

        cargarDatos()

    }, []);

    const cargarDatos = async () => {
        Swal.fire({
            title: 'Espere un momento',
            text: 'Cargando información',
            allowOutsideClick: true,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        const datos = await consultarDatabase("usuarios")
        Swal.close()

        setData([...datos])
    }


    //guardar los usuarios en el sistema
    const guardarDatos = function (e) {
        e.preventDefault()



        const usuario = {
            email: email,
            nombres:nombres,
            apellidos:apellidos,
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
            text: "Se ha realizado el registro..!"
        })
        limpiarCampos()
    }

    //editar y salvar los campos los usuarios en el sistema
    const editarUsuario = function (e) {
        e.preventDefault()

        const usuario = {
            email: email,
            nombres:nombres,
            apellidos:apellidos,
            password: password,
            perfil: perfil,
            estado: activo == 1 ? true : false,
            id:id
            
        }
        console.log(usuario+" - "+usuario.id)
         editarUsuarios(usuario)
        console.log("actualizado")


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

    //permite seleccionar un usuario de acuerdo a su id
    const seleccionarUsuario = (usuario) => {

        
            setEmail(usuario.email)
            setNombres(usuario.nombres)
            setApellidos(usuario.apellidos)
            setPassword(usuario.password)
            setPerfil(usuario.perfil)
            setActivo(usuario.activo)
            setId(usuario.id)
      

    }

   



    return (
        <>

            <div id="wrapper">
                <MenuComponent />

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <NavBarComponent />



                        <div className="container-fluid" id="container-wrapper">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Gestión de Usuarios</h1>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                                    <li className="breadcrumb-item">Productos</li>
                                    <li className="breadcrumb-item active" aria-current="page">Consultas</li>
                                </ol>
                            </div>


                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="col-lg-12 card mb-4" style={{ alignContent: "right" }}>
                                        <input className="col-lg-2 btn btn-primary"
                                            type="button" value="Nuevo"
                                            data-toggle="modal" data-target="#logoutModal"
                                        />
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="card mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">Productos Registrados</h6>
                                            </div>
                                           
                                            <div className="table-responsive p-3">
                                                <h2>Buscar Información</h2>
                                                
                                                <input className="form-control" id="myInput" type="text" placeholder="Buscar.." />
                                                <br />
                                                <table className="table table-bordered table" id="dataTable98">
                                                    <thead className="thead-light">

                                                        <tr>
                                                            <th>Nombres</th>
                                                            <th>Apellidos</th>
                                                            <th>Email</th>
                                                            <th>Perfil</th>
                                                            <th>Estado</th>
                                                            <th>&nbsp;</th>
                                                            <th>&nbsp;</th>
                                                        </tr>

                                                    </thead>

                                                    <tbody id="dataTable980">
                                                        {data.length ? (
                                                            data.map(usuario => (
                                                                <tr key={usuario.id}>
                                                                    <td>{usuario.nombres}</td>
                                                                    <td>{usuario.apellidos}</td>
                                                                    <td>{usuario.email}</td>
                                                                    <td>{usuario.perfil}</td>
                                                                    <td>{usuario.activo ? "Si" : "No"}</td>
                                                                    <td><a data-toggle="modal" data-target="#editarUsuario"
                                                                        onClick={(e) => seleccionarUsuario(usuario)} ><i className="fa fa-edit" aria-hidden="true"></i></a></td>
                                                                    <td><a href="#" className="btn btn-sm btn-primary"><i className="fa fa-window-close" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan='7'>No hay registros</td>
                                                            </tr>
                                                        )
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabelLogout"
                aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabelLogout">Registro de Usuarios.</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="col-lg-12">
                            <form onSubmit={guardarDatos}>
                                <div className="card mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Información del Usuario</h6>
                                    </div>
                                    <div className="card-body card-success">

                                        <label htmlFor="email">Email</label>
                                        <input className="form-control  " type="email" required
                                            maxLength="250" id="email" onChange={handleEmail}
                                            required placeholder="Email del usuario" />

                                        <label htmlFor="email">Clave de acceso</label>
                                        <input className="form-control  " type="password" onChange={handlePassword}
                                            maxLength="250" minLength="8" id="password" placeholder="Clave de acceso" />

                                        <label htmlFor="nombres">Nombres</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="150" id="nombres" onChange={handleNombres}
                                            required placeholder="Nombres del usuario" />

                                        <label htmlFor="apellidos">Apellidos</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="152" id="apellidos" onChange={handleApellidos}
                                            required placeholder="Apellidos del usuario" />


                                        <div className="form-group">
                                            <label htmlFor="perfil">Perfil</label>
                                            <select className="select2-single form-control" onChange={handlePerfil}
                                                name="perfil" required id="perfil" id="perfil">
                                                <option  value='none' >Seleccione el perfil</option>
                                                <option value="administrador">Administrador</option>
                                                <option value="vendedor">Vendedor</option>



                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="estado">Estado</label>
                                            <select className="select2-single form-control" onChange={handleActivo}
                                                name="estado" required id="impuesto" id="select3Single">
                                                <option value='none' >Seleccione el estado</option>
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



            <div className="modal fade" id="editarUsuario" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabelLogout"
                aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabelLogout">Editar Usuarios.</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="col-lg-12">
                            <form onSubmit={editarUsuario}>
                                <div className="card mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Información del Usuario</h6>
                                    </div>
                                    <div className="card-body card-success">

                                        <label htmlFor="email">Email</label>
                                        <input className="form-control  " type="email" required
                                            maxLength="250" id="email" onChange={handleEmail}
                                            required placeholder="Email del usuario" defaultValue={email} />

                                        <label htmlFor="email">Clave de acceso</label>
                                        <input className="form-control  " type="password" onChange={handlePassword}
                                            maxLength="250" minLength="8" id="password" value={password} placeholder="Clave de acceso" />

                                        <label htmlFor="nombres">Nombres</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="150" id="nombres" onChange={handleNombres}
                                            required placeholder="Nombres del usuario" value={nombres} />

                                        <label htmlFor="apellidos">Apellidos</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="152" id="apellidos" onChange={handleApellidos} value={apellidos}
                                            required placeholder="Apellidos del usuario" />


                                        <div className="form-group">
                                            <label htmlFor="perfil">Perfil</label>
                                            <select className="select2-single form-control" onChange={handlePerfil}
                                                name="perfil" required id="perfil" >
                                                <option disabled >Seleccione el perfil</option>
                                                <option selected={(perfil === 'administrador')} value="administrador">Administrador</option>
                                                <option selected={(perfil === 'vendedor')} value="vendedor">Vendedor</option>



                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="estado">Estado</label>
                                            <select className="select2-single form-control" onChange={handleActivo}
                                                name="estado" required id="impuesto" >
                                                <option disabled >Seleccione el estado</option>
                                                <option selected={!activo} value="1">Activo</option>
                                                <option selected={!activo} value="0">Inactivo</option>
                                            </select>
                                        </div>




                                    </div>

                                </div>
                                <div className="col-lg-12 ">
                                    <button type="submit" className="btn btn-primary mb-4">Actualizar</button>
                                </div>

                            </form>
                        </div>



                    </div>
                </div>
            </div>



        </>
    )

}

export default GestionUsuariosComponent