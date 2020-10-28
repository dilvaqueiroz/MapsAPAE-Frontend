import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from "./pages/Landing";
import Usuario from './pages/Usuario';
import CreateUsuario from './pages/CreateUsuario'
import UsuarioMap from './pages/UsuarioMap';

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={UsuarioMap}/>
                <Route path="/usuarios/create" component={CreateUsuario}/>
                <Route path="/usuarios/:id" component={Usuario}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;