import './App.css';
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginComponent from './componentes/login/login';
import HomeComponent from './componentes/home/home';
import GestionProductoComponent from './componentes/productos/lstProductos';
import GestionUsuariosComponent from './componentes/usuarios/lstUsuarios';
import { GestionFacturacionComponent } from './componentes/facturacion/lstFacturas';
import { datosUsuario } from './componentes/config/firebase';
import ConsultaFacturasComponent from './componentes/facturacion/consultarVentas';
import { EditarFacturacionComponent } from './componentes/facturacion/editarFactura';
import { VisualizarFactura } from './componentes/facturacion/visualizarFactura';
import { RutaPrivada } from './componentes/home/RutaPrivada';
import { RutaProtegida } from './componentes/home/RutaProtegida';





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
            <RutaProtegida exact path="/home" component={HomeComponent}></RutaProtegida>
            
            <RutaPrivada hasRole="administrador" exact  path="/gestionProd" component={GestionProductoComponent} appProps={{ isAuthenticated }}></RutaPrivada>
            <RutaPrivada hasRole="administrador" exact path="/gestionUser" component={GestionUsuariosComponent}></RutaPrivada>
            <RutaProtegida exact path="/ventas" component={GestionFacturacionComponent}></RutaProtegida>
            <RutaProtegida exact path="/lstventas" component={ConsultaFacturasComponent}></RutaProtegida>
            <RutaProtegida exact path="/editVentas/:id" component={EditarFacturacionComponent}></RutaProtegida>
            <RutaProtegida exact path="/visualizarFactura/:id" component={VisualizarFactura}></RutaProtegida>
            

          </Switch>

        </Switch>

      </Router>

    </>
  );
}

export default App;
