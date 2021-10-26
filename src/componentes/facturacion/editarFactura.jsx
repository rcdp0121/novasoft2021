import NavBarComponent from '../home/menuSuperior';
import MenuComponent from '../home/menu';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { buscarCliente, consultarDatabase, actualizarDocumentoDatabase, consultarDocumentoDatabase, guardarDatabase } from '../config/firebase';
import { useParams, useHistory } from 'react-router';




const estadoInicial = { "id": "2USMCMat7Elr0cKZAm1g", "productos": [], "total": 5292000, "fechaFactura": { "seconds": 1634509722, "nanoseconds": 305000000 }, "cliente": { "nombres": "CARLOS MARTINEZ CAMARGO", "DIRECCION": "BARRANQUILLA", "documento": "123456", "id": "aj9id80ji21wQoCbZoD6" }, "vendedor": { "id": "SGr8R6JvPc0GOHiQ3uOf", "nombres": "Rafael", "codigo": "v1GdDeRF6hSzks8DUAc5N6FG2ki2", "perfil": "administrador", "activo": true, "email": "rafaeldavid0121@gmail.com", "apellidos": "Carrascal" } }

export const EditarFacturacionComponent = () => {

    //datos de la factura

    const { id } = useParams();

    let [factura, setFactura] = useState(estadoInicial)

    //para navegar a diferentes rutas
    const history = useHistory()

    let [data, setData] = useState([]);

    let [productos, setProductos] = useState([{}])

    let [total, setTotal] = useState(0)

    let [documento, setDocumento] = useState("")

    let [nombreCliente, setNombreCliente] = useState("")

    let [cantidad, setCantidad] = useState(1)

    let [cliente, setCliente] = useState('')

    let [codigo, setCodigo] = useState('')

    const search = async () => {

        let cliente1 = await buscarCliente("clientes", documento)

        if (cliente1 === undefined) {
            Swal.fire({
                title: 'Información',
                text: 'No se ha encontrado el documento',

            })
        } else {
            setCliente(cliente1)
            setNombreCliente(cliente1.nombres)
        }
    }


    const handleDocumento = (e) => {
        setDocumento(e.target.value)
    }

    const handleCantidad = (e) => {
        setCantidad(e.target.value)
    }

    const handleCodigo = (e) => {
        setCodigo(e.target.value)


    }



    useEffect(() => {

        console.log("cargando informaciónn")
        //cargarDatosFactura(id)
         cargarDatos(id)
        //setTotal(factura.total)
        console.log(factura)

    }, []);




    const agregarProducto = (e) => {

        e.preventDefault()
        let p
        for (var i = 0; i < data.length; i++) {

            if (codigo === data[i].id) {

                p = data[i]
            }
        }

        let sub = (Number((p.valor * p.impuesto)) + Number(p.valor)) * cantidad;

        const productoVenta = {
            codigo: p.codigo,
            nombre: p.nombre,
            impuesto: p.impuesto,
            valor: p.valor,
            fecha: new Date(),
            cantidad: cantidad,
            total: sub
        }

        setTotal(total + productoVenta.total)

        const prods = []
        prods.push(productoVenta)


        productos.push(productoVenta)


    }

    const eliminarProducto = (e, prod) => {

        e.preventDefault()

        total -= prod.total

        setProductos(productos.filter(item => item.codigo !== prod.codigo))



    }

    const cargarDatos = async (id) => {


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
        cargarDatosFactura(id)

    }

    const cargarDatosFactura = async (id) => {


        Swal.fire({
            title: 'Espere un momento',
            text: 'Cargando información',
            allowOutsideClick: true,
            didOpen: () => {
                Swal.showLoading()
            },
        })
        const datos =  await consultarDocumentoDatabase("ventas", id)
       
        console.log(datos)
         setFactura(datos)
         setCliente(datos.cliente)
         setNombreCliente(cliente.nombres)
         await setProductos(datos.productos)
         Swal.close()


    }


    const actualizarFactura = async (e) => {

        e.preventDefault()

        const facturaVenta = {
            cliente: cliente,
            productos: productos,
            fechaFactura: factura.fechaFactura,
            total: total

        }

        await actualizarDocumentoDatabase("ventas", factura.id, facturaVenta)

        Swal.fire({
            icon: "success",
            text: "Se ha registrado su venta "
        })

        // history.push("/pdf")




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
                                <h1 className="h3 mb-0 text-gray-800">Editar Factura</h1>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                                    <li className="breadcrumb-item">Productos</li>
                                    <li className="breadcrumb-item active" aria-current="page">Consultas</li>
                                </ol>
                            </div>

                            <div className="row">

                                <div className="col-lg-6">

                                    <div className="card mb-4">
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Información Básica de la Factura</h6>
                                        </div>
                                        <div className="card-body">
                                            <label htmlFor="documento">Documento comprador</label>
                                            <input className="form-control  mb-3" type="text" id="documento"
                                                maxLength="10" defaultValue={factura.cliente.documento} placeholder="Número de documento" onChange={handleDocumento}
                                                onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        search()
                                                    }
                                                }} />
                                            <label htmlFor="select2Single">Nombre del cliente</label>
                                            <input className="form-control  mb-3" defaultValue={cliente.nombres}
                                                type="text" maxLength="10"
                                                placeholder="Nombre del cliente" />

                                            <div className="form-group">
                                                <label htmlFor="servicio">Servicios</label>
                                                <select className="select2-single form-control" id="servicio"
                                                    onChange={handleCodigo}>
                                                    <option noselected="true"  >Seleccione el servicio</option>
                                                    {data.length ? (
                                                        data.map(producto => (

                                                            <option key={producto.id} value={producto.id} >{producto.nombre}</option>

                                                        ))
                                                    ) : (
                                                        <option >No hay servicios</option>
                                                    )
                                                    }
                                                </select>
                                            </div>

                                            <label className="cantidad">Cantidad</label>
                                            <input className="form-control  mb-3" type="number" maxLength="10" id="cantidad"
                                                min="1" max="100" placeholder="Cantidad" defaultValue={1} onChange={handleCantidad} />

                                            <button onClick={agregarProducto} type="submit" className="btn btn-primary">Actualizar</button>

                                        </div>

                                    </div>
                                    <div className="col-lg-12"></div>
                                    <button onClick={(event) => actualizarFactura(event)} type="submit"
                                        className="btn btn-primary">Actualizar</button>
                                </div>


                                <div className="col-lg-6">

                                    <div className="table-responsive">
                                        <table className="table align-items-center table-flush">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Acción </th>
                                                    <th>Codigo </th>
                                                    <th>Nombre</th>
                                                    <th>Cantidad</th>
                                                    <th>Valor</th>
                                                    <th>Impuesto</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    productos.length ? (
                                                        productos.map(dat => (

                                                            <tr key={dat.codigo}>
                                                                <td><button
                                                                    onClick={(event) => eliminarProducto(event, dat)} href="#" className="btn btn-sm btn-primary"><i className="fa fa-window-close" aria-hidden="true"></i></button></td>
                                                                <td>{dat.codigo}</td>
                                                                <td>{dat.nombre}</td>
                                                                <td>{dat.cantidad}</td>
                                                                <td>{dat.valor}</td>
                                                                <td>{dat.impuesto}</td>
                                                                <td style={{ textAlign: "right" }}>{dat.total}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td>ff</td>
                                                            <td>fff</td>
                                                            <td>ff</td>
                                                            <td>f</td>
                                                            <td ></td>
                                                        </tr>
                                                    )
                                                }

                                                <tr>
                                                    <td colSpan="6" style={{ textAlign: "right" }}>Total</td>
                                                    <td>{total}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>





                            </div></div>
                    </div>
                </div>
            </div>





        </>
    )

}