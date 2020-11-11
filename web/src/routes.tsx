import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Landing from "./pages/Landing";
import Usuario from './pages/Usuario';
import Selection from './pages/Selection'
import Doador from './pages/Doador';
import Colaborador from './pages/Colaborador';
import CreateUsuario from './pages/CreateUsuario'
import CreateDoador from './pages/CreateDoador'
import CreateColaborador from './pages/CreateColaborador';
import UsuarioMap from './pages/UsuarioMap';
import ChangeUsuario from './pages/ChangeUsuario';
import ChangeDoador from './pages/ChangeDoador';
import ChangeColaborador from './pages/ChangeColaborador';



function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/app" component={UsuarioMap}/>
                <Route path="/selection" component={Selection}/>
                <Route path="/usuarios/create" component={CreateUsuario}/>
                <Route path="/doadores/create" component={CreateDoador}/>
                <Route path="/colaboradores/create" component={CreateColaborador}/>
                <Route path="/usuarios/:id" component={Usuario}/>
                <Route path="/doadores/:id" component={Doador}/>
                <Route path="/colaboradores/:id" component={Colaborador}/>
                <Route path="/users/:id/change" component={ChangeUsuario}/> 
                <Route path="/doadores/change/:id" component={ChangeDoador}/>
                <Route path="/colaboradores/change/:id" component={ChangeColaborador}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;