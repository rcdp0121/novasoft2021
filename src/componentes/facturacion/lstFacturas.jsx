import NavBarComponent from '../home/menuSuperior';
import MenuComponent from '../home/menu';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2'
import { buscarCliente, consultarDatabase, guardarDatabase } from '../config/firebase';





export const GestionFacturacionComponent = () => {

    //para navegar a diferentes rutas
    const history = useHistory()

    let [data, setData] = useState([]);

    let [productos, setProductos] = useState([{}]);

    let [total, setTotal] = useState(0)

    let [documento, setDocumento] = useState("")

    let [nombreCliente, setNombreCliente] = useState("")

    let [cantidad, setCantidad] = useState(1)

    let [cliente, setCliente] = useState('')

    let [codigo, setCodigo] = useState('')

    const search = async () => {
        console.log(documento)
        let cliente1 = await buscarCliente("clientes", documento)
        //setCliente(cliente1)
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
        console.log(e.target.value)
    }

    useEffect(() => {

        cargarDatos()


    }, []);




    const agregarProducto = (e) => {

        e.preventDefault()
        let p
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + "  == " + codigo)
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


        setProductos(productos.concat(prods))



    }

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
        //setProductosVender([...datos])

    }


    const registrarFactura = (e) => {

        e.preventDefault()
        const usuario = JSON.parse(sessionStorage.getItem("usuario"))

        const facturaVenta = {
            cliente: cliente,
            productos: productos,
            fechaFactura: new Date(),
            total: total,
            vendedor:usuario
        }

        guardarDatabase("ventas", facturaVenta)

        Swal.fire({
            icon: "success",
            text: "Se ha registrado su venta "
        })

        history.push("/pdf")




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

                                <div className="col-lg-6">

                                    <div className="card mb-4">
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Información Básica</h6>
                                        </div>
                                        <div className="card-body">
                                            <label for="select2Single">Documento comprador</label>
                                            <input className="form-control  mb-3" type="number"
                                                maxLength="10" placeholder="Número de documento" onChange={handleDocumento}
                                                onKeyPress={event => {
                                                    if (event.key === 'Enter') {
                                                        search()
                                                    }
                                                }} />
                                            <label for="select2Single">Nombre del cliente</label>
                                            <input className="form-control  mb-3" type="text" maxLength="10"
                                                placeholder="Nombre del cliente" defaultValue={nombreCliente} />

                                            <div className="form-group">
                                                <label for="select2Single">Servicios</label>
                                                <select className="select2-single form-control" name="state" id="servicio"
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

                                            <label for="cantidad">Cantidad</label>
                                            <input className="form-control  mb-3" type="number" maxLength="10"
                                                min="1" max="100" placeholder="Cantidad" defaultValue={1} onChange={handleCantidad} />

                                            <button onClick={agregarProducto} type="submit" className="btn btn-primary">Agregar</button>

                                        </div>

                                    </div>
                                    <div className="col-lg-12"></div>
                                    <button onClick={registrarFactura} type="submit" className="btn btn-primary">Registrar</button>
                                </div>


                                <div className="col-lg-6">

                                    <div className="table-responsive">
                                        <table className="table align-items-center table-flush">
                                            <thead className="thead-light">
                                                <tr>
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
                                                            <tr key={dat.key}>
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
                                                    <td colSpan="5" style={{ textAlign: "right" }}>Total</td>
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