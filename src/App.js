import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './componentes/login/login';
import HomeComponent from './componentes/home/home';
import RegistroProductoComponent from './componentes/productos/regProductos';
import GestionProductoComponent from './componentes/productos/lstProductos';
import GestionUsuariosComponent from './componentes/usuarios/lstUsuarios';
import { GestionFacturacionComponent } from './componentes/facturacion/lstFacturas';
import { datosUsuario } from './componentes/config/firebase';
import ConsultaFacturasComponent from './componentes/facturacion/consultarVentas';
import { EditarFacturacionComponent } from './componentes/facturacion/editarFactura';
import { VisualizarFactura } from './componentes/facturacion/visualizarFactura';





function App() {
  
  
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await datosUsuario;
      userHasAuthenticated(true);
    } catch (e) {
      alert(e);
    }
  }
  return (
    <>

      <Router>
        <Switch>
          <Switch>
            <Route exact path="/" component={LoginComponent}></Route>
            <Route exact path="/home" component={HomeComponent}></Route>
            <Route exact path="/regProd" component={RegistroProductoComponent} appProps={{ isAuthenticated }}></Route>
            <Route exact path="/gestionProd" component={GestionProductoComponent} appProps={{ isAuthenticated }}></Route>
            <Route exact path="/gestionUser" component={GestionUsuariosComponent}></Route>
            <Route exact path="/ventas" component={GestionFacturacionComponent}></Route>
            <Route exact path="/lstventas" component={ConsultaFacturasComponent}></Route>
            <Route exact path="/editVentas/:id" component={EditarFacturacionComponent}></Route>
            <Route exact path="/visualizarFactura/:id" component={VisualizarFactura}></Route>
            

          </Switch>

        </Switch>

      </Router>

    </>
  );
}

export default App;
