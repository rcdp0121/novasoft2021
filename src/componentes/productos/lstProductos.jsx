
import NavBarComponent from '../home/menuSuperior';
import MenuComponent from '../home/menu';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { consultarDatabase, guardarDatabase, actualizarDocumentoDatabase } from '../config/firebase';



const GestionProductoComponent = () => {

    let [productoSeleccionado, setProductoSeleccionado] = useState('')

    //datos del producto
    let [codigo, setCodigo] = useState('')

    let [nombre, setNombre] = useState('')

    let [valor, setValor] = useState('')

    let [activo, setActivo] = useState('')

    let [descripcion, setDescripcion] = useState('')

    let [impuesto, setImpuesto] = useState('')

    let [data, setData] = useState([]);



    const handleCodigo = (e) => {
        setCodigo(e.target.value)
    }

    const handleValor = (e) => {
        setValor(e.target.value)
    }

    const handleDescripcion = (e) => {
        setDescripcion(e.target.value)
    }

   

    const handleNombre = (e) => {
        setNombre(e.target.value)
    }

    const handleImpuesto = (e) => {

        setImpuesto(e.target.value)
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
        const datos = await consultarDatabase("productos")
        Swal.close()

        setData([...datos])
    }

    const selecionarProducto = (producto) => {
        console.log("impuesto seleccionado : " + producto.impuesto)
        setImpuesto(producto.impuesto)
        setNombre(producto.nombre)
        setCodigo(producto.codigo)
        setDescripcion(producto.descripcion)
        setValor(producto.valor)
        //handleActivo(producto.activo)
        setProductoSeleccionado(producto)
    }

    //editar y salvar los campos los usuarios en el sistema
    const editarProducto = function (e) {
        e.preventDefault()
        console.log("impuesto = " + impuesto)
        const producto = {
            codigo: codigo,
            nombre: nombre,
            valor: valor,
            estado: activo === 1 ? true : false,
            impuesto: impuesto
        }

        actualizarDocumentoDatabase("productos", productoSeleccionado.id, producto)

         Swal.fire({
            icon: "success",
            text: "Se ha realizado la actualización"
        })
        //cargarDatos()
    }


    const guardarDatos = function (e) {
        e.preventDefault()



        const producto = {
            codigo: codigo,
            nombre: nombre,
            valor: valor,
            descripcion: descripcion,
            impuesto: impuesto,
            activo: true
        }

        guardarProducto(producto)
        limpiarCampos()
        Swal.fire({
            icon: "success",
            text: "Se ha realizado el registro..!"
        })

    }

    const limpiarCampos = () => {
        setValor("")
        setDescripcion("")
        setNombre("")
        setImpuesto("")
        setCodigo("")
    }

    async function guardarProducto(producto) {
        try {
            guardarDatabase('productos', producto);
        } catch (error) {
            console.log("error al registrar productos." + error)
        }
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
                                <h1 className="h3 mb-0 text-gray-800">Gestión de Productos</h1>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                                    <li className="breadcrumb-item">Productos</li>
                                    <li className="breadcrumb-item active" aria-current="page">Consultas</li>
                                </ol>
                            </div>


                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="col-lg-12 card mb-4" style={{ alignContent: "right" }}>
                                        <input className="col-lg-2 btn-sm btn-success"
                                            type="button" value="Nuevo"
                                            data-toggle="modal" data-target="#nuevoProducto"
                                        />
                                    </div>

                                    <div className="col-lg-12">



                                        <div className="card mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">Productos Registrados</h6>
                                            </div>

                                            <div className="table-responsive p-3">
                                                <h2>Buscar Información</h2>
                                                
                                                <input class="form-control" id="myInput" type="text" placeholder="Buscar.." />
                                                <br />
                                                <table className="table table-bordered table" id="dataTable98">
                                                    <thead className="thead-light">

                                                        <tr>
                                                            <th>Codigo</th>
                                                            <th>Nombres</th>
                                                            <th>Valor</th>
                                                            <th>Impuesto</th>
                                                            <th>&nbsp; </th>
                                                            <th>&nbsp; </th>
                                                        </tr>

                                                    </thead>

                                                    <tbody id="dataTable980">
                                                        {data.length ? (
                                                            data.map(producto => (
                                                                <tr key={producto.id}>
                                                                    <td>{producto.codigo}</td>
                                                                    <td>{producto.nombre}</td>
                                                                    <td>{producto.valor}</td>
                                                                    <td>{producto.impuesto}</td>
                                                                    <td><a data-toggle="modal" data-target="#editarProducto"
                                                                        onClick={(e) => selecionarProducto(producto)} href="#" className="btn btn-sm btn-primary"><i className="fa fa-edit" aria-hidden="true"></i></a></td>
                                                                    <td><a href="#" className="btn btn-sm btn-primary"><i className="fa fa-print" aria-hidden="true"></i></a></td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colspan="7">No hay registros</td>
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




            <div class="modal fade" id="editarProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelLogout"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabelLogout">Edición de Producto.</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="col-lg-12">
                            <form onSubmit={editarProducto}>
                                <div className="card mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Información del Producto</h6>
                                    </div>
                                    <div className="card-body">
                                        <label for="codigo">Codigo</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="10" id="codigo" defaultValue={productoSeleccionado.codigo} onChange={handleCodigo}
                                            required placeholder="Codigo del producto" />

                                        <label for="nombre">Nombre</label>
                                        <input className="form-control  mb-3" type="text" defaultValue={productoSeleccionado.nombre} onChange={handleNombre}
                                            maxLength="150" id="nombre" placeholder="Nombre del producto..." />

                                        <label for="descripcion">Descripción</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="250" id="descripcion" defaultValue={productoSeleccionado.descripcion} onChange={handleDescripcion}
                                            required placeholder="Descripción del producto" />

                                        <label for="valor">Precio</label>
                                        <input className="form-control  mb-3" type="number" required
                                            min="1" max="1000000" id="valor" defaultValue={productoSeleccionado.valor} onChange={handleValor}
                                            required placeholder="Precio del producto" step="any" />

                                        <label for="impuesto">Impuesto Aplicado</label>
                                        <input className="form-control  mb-3" type="number" required
                                            min="0" max="99" id="impuesto" defaultValue={productoSeleccionado.impuesto} onChange={handleImpuesto}
                                            required placeholder="Impuesto del producto" step="any" />


                                    </div>

                                </div>
                                <div className="col-lg-12 ">
                                    <button type="submit" className="btn btn-primary mb-4">Registrar</button>
                                </div>

                            </form>
                        </div>



                    </div>
                </div >
            </div >



            <div class="modal fade" id="nuevoProducto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabelLogout"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabelLogout">Registro de Productos.</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="col-lg-12">
                            <form onSubmit={guardarDatos}>
                                <div className="card mb-4">
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-primary">Información del Producto</h6>
                                    </div>
                                    <div className="card-body">
                                        <label for="codigo">Codigo</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="10" id="codigo" defaultValue={productoSeleccionado.codigo} onChange={handleCodigo}
                                            required placeholder="Codigo del producto" />

                                        <label for="nombre">Nombre</label>
                                        <input className="form-control  mb-3" type="text" defaultValue={productoSeleccionado.nombre} onChange={handleNombre}
                                            maxLength="150" id="nombre" placeholder="Nombre del producto..." />

                                        <label for="descripcion">Descripción</label>
                                        <input className="form-control  mb-3" type="text" required
                                            maxLength="250" id="descripcion" defaultValue={productoSeleccionado.descripcion} onChange={handleDescripcion}
                                            required placeholder="Descripción del producto" />

                                        <label for="valor">Precio</label>
                                        <input className="form-control  mb-3" type="number" required
                                            min="1" max="1000000" id="valor" defaultValue={productoSeleccionado.valor} onChange={handleValor}
                                            required placeholder="Precio del producto" step="any" />

                                        <label for="impuesto">Impuesto Aplicado</label>
                                        <input className="form-control  mb-3" type="number" required
                                            min="0" max="99" id="impuesto" defaultValue={productoSeleccionado.impuesto} onChange={handleImpuesto}
                                            required placeholder="Impuesto del producto" step="any" />


                                    </div>

                                </div>
                                <div className="col-lg-12 ">
                                    <button type="submit" className="btn btn-primary mb-4">Registrar</button>
                                </div>

                            </form>
                        </div>



                    </div>
                </div >
            </div >


        </>
    )

}

export default GestionProductoComponent