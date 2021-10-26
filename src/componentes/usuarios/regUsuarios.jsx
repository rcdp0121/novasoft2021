import React, { useState } from 'react'
import NavBarComponent from '../home/menuSuperior';
import MenuComponent from '../home/menu';
import { guardarDatabase } from '../config/firebase';
import Swal from 'sweetalert2'

const RegistroProductoComponent = () => {



    const [id, setId] = useState('');

    const [nombre, setNombre] = useState('');

    const [valor, setValor] = useState('');


    const [impuesto, setImpuesto] = useState('');

    const handleId = (e) => {
        setId(e.target.value)
    }

    const handleNombre = (e) => {
        setNombre(e.target.value)
    }

    const handleValor = (e) => {
        setValor(e.target.value)
    }

    const handleImpuesto = (e) => {
        setImpuesto(e.target.value)
    }


    const guardarDatos = function (e) {
        e.preventDefault()

        

        const producto = {
            codigo: id,
            nombre: nombre,
            valor: valor,
            impuesto: impuesto,
            activo : true
        }

        guardarProducto(producto)
        
        Swal.fire({
            icon: "success",
            text: "Se ha realizado el registro..!"
          })
        limpiarCampos()
    }

    function limpiarCampos() {
        setId("")
        setNombre("")
        setValor("")
        setImpuesto("")
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
                                <h1 className="h3 mb-0 text-gray-800">Administración de Productos</h1>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                                    <li className="breadcrumb-item">Forms</li>
                                    <li className="breadcrumb-item active" aria-current="page">Registro de Productos</li>
                                </ol>
                            </div>
                            
                            <div className="row">

                                <div className="col-lg-12">
                                    <form onSubmit={guardarDatos}>
                                        <div className="card mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">Información Producto</h6>
                                            </div>
                                            <div className="card-body">
                                                <label for="id">Identificador del producto</label>
                                                <input className="form-control  mb-3" type="text"
                                                    maxLength="10" id="id" placeholder="Identificador del producto" onChange={handleId} />

                                                <label for="nombre">Nombre del Producto</label>
                                                <input className="form-control  mb-3" id="nombre" type="text" maxLength="150"
                                                    placeholder="Nombre del producto" onChange={handleNombre} />

                                                <label for="valor">Precio del producto</label>
                                                <input className="form-control  mb-3" type="number" id="valor" maxLength="10"
                                                    placeholder="Precio del producto" onChange={handleValor} />



                                                <div className="form-group">
                                                    <label for="impuesto">Impuesto aplicado</label>
                                                    <select className="select2-single form-control" name="impuesto" id="impuesto" onChange={handleImpuesto} >
                                                        <option disabled >Seleccione el impuesto</option>
                                                        <option defaultValue value="0.19">Iva 19%</option>
                                                        <option value="0.16">Iva 16%</option>



                                                    </select>
                                                </div>




                                            </div>

                                        </div>
                                        <div className="col-lg-12"></div>
                                        <button type="submit" className="btn btn-primary">Registrar</button>
                                    </form>
                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}

export default RegistroProductoComponent