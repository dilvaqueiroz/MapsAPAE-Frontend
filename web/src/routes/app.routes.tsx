import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Usuario from '../pages/Dashboard/Usuario';
import Selection from '../pages/Dashboard/Selection'
import Doador from '../pages/Dashboard/Doador';
import Colaborador from '../pages/Dashboard/Colaborador';
import CreateUsuario from '../pages/Dashboard/CreateUsuario'
import CreateDoador from '../pages/Dashboard/CreateDoador'
import CreateColaborador from '../pages/Dashboard/CreateColaborador';
import NavigationMap from '../pages/Dashboard/Index';
import ChangeUsuario from '../pages/Dashboard/ChangeUsuario';
import ChangeDoador from '../pages/Dashboard/ChangeDoador';
import ChangeColaborador from '../pages/Dashboard/ChangeColaborador';

const AppRoutes: React.FC = () => (
            <Switch>
                <BrowserRouter>
                    <Route exact path="/app" component={NavigationMap} />
                    <Route exact path="/selection" component={Selection} />
                    <Route exact path="/usuarios/create" component={CreateUsuario} />
                    <Route exact path="/doadores/create" component={CreateDoador} />
                    <Route exact path="/colaboradores/create" component={CreateColaborador} />
                    <Route exact path="/usuarios/:id" component={Usuario} />
                    <Route exact path="/doadores/:id" component={Doador} />
                    <Route exact path="/colaboradores/:id" component={Colaborador} />
                    <Route exact path="/users/:id/change" component={ChangeUsuario} />
                    <Route exact path="/donors/:id/change" component={ChangeDoador} />
                    <Route exact path="/collaborators/:id/change" component={ChangeColaborador} />
                </BrowserRouter>
            </Switch>
    );

export default AppRoutes; 