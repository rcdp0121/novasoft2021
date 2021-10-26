import NavBarComponent from '../home/menuSuperior';
import MenuComponent from '../home/menu';
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { consultarDocumentoDatabase, guardarDatabase, actualizarDocumentoDatabase } from '../config/firebase';
import { format } from 'date-fns-tz'
import { Date } from 'prismic-reactjs';
import { Link, NavLink } from 'react-router-dom'
import { useParams, useHistory } from 'react-router';

const estadoInicial = { "id": "2USMCMat7Elr0cKZAm1g", "productos": [], "total": 5292000, "fechaFactura": { "seconds": 1634509722, "nanoseconds": 305000000 }, "cliente": { "nombres": "CARLOS MARTINEZ CAMARGO", "DIRECCION": "BARRANQUILLA", "documento": "123456", "id": "aj9id80ji21wQoCbZoD6" }, "vendedor": { "id": "SGr8R6JvPc0GOHiQ3uOf", "nombres": "Rafael", "codigo": "v1GdDeRF6hSzks8DUAc5N6FG2ki2", "perfil": "administrador", "activo": true, "email": "rafaeldavid0121@gmail.com", "apellidos": "Carrascal" } }

export const VisualizarFactura = () => {

    const logo = "./../images/logo.png"

    //datos de la factura

    const { id } = useParams();

    let [factura, setFactura] = useState(estadoInicial)

    useEffect(() => {


        //cargarDatosFactura(id)
        cargarDatosFactura(id)
        //setTotal(factura.total)


    }, []);

    const cargarDatosFactura = async (id) => {



        const datos = await consultarDocumentoDatabase("ventas", id)


        setFactura(datos)


    }

    const imprimir = () => {
        var content = document.getElementById("divcontents");
        var pri = document.getElementById("ifmcontentstoprint").contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    return (
        <>
            <div id="wrapper">
                <MenuComponent />

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <NavBarComponent />


                        <div class="container-fluid" id="divcontents">
                            <div class="row">
                                <div class="col-xs-10 ">
                                    <h1>Factura </h1>
                                </div>

                            </div>
                            <hr />
                            <div class="row" >

                                <div class="col-xs-12 text-left">
                                    <h5>Factura No. {factura.consecutivo}</h5>
                                    <h5>Fecha:
                                        {
                                            new Intl.DateTimeFormat("es-CO", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit"
                                            }).format(new Date(factura.fechaFactura.seconds * 1000 + factura.fechaFactura.nanoseconds / 1000000))
                                        } </h5><br />


                                    <h5 class="h5">COMPRADOR: {factura.cliente.documento} {factura.cliente.nombres}
                                    </h5>
                                </div>


                            </div>

                                        <hr/>
                            <div class="row text-center">
                                <div class="col-xs-12">
                                    <table class="table table-condensed table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Código</th>
                                                <th>Descripción</th>
                                                <th>Cantidad</th>
                                                <th>Precio unitario</th>
                                                <th>Impuesto</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {factura.productos.length ? (
                                                factura.productos.map(dat => (
                                                    <tr key={dat.codigo}>

                                                        <td>{dat.codigo}</td>
                                                        <td>{dat.nombre}</td>
                                                        <td>{dat.cantidad}</td>
                                                        <td> {new Intl.NumberFormat("es-CO", {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }).format(dat.valor)}</td>
                                                        <td>{dat.impuesto}</td>
                                                        <td style={{ textAlign: "right" }}>{new Intl.NumberFormat("es-CO", {
                                                            style: "currency",
                                                            currency: "COP",
                                                            minimumFractionDigits: 0,
                                                            maximumFractionDigits: 0
                                                        }).format(dat.total)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td>&nbsp;</td>
                                                    <td ></td>
                                                </tr>
                                            )
                                            }

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="5" class="text-right">Total <small>(con impuestos)</small></td>

                                                <td style={{ textAlign: "right" }}>{new Intl.NumberFormat("es-CO", {
                                                    style: "currency",
                                                    currency: "COP",
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0
                                                }).format(factura.total)}
                                                </td>
                                            </tr>



                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            
                        </div>
                        <div class="row">
                                <div class="col-xs-12 text-center">
                                    <p class="h5">Gracias por su compra!</p>
                                    <button onClick={imprimir} class="btn btn-primary">Imprimir</button>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
            <iframe id="ifmcontentstoprint" style={{height: "0px", width: "0px", position: "absolute"}}></iframe>

        </>

    )
}