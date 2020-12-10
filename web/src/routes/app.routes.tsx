import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

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
import signIn from '../services/auth';
import Landing from '../pages/SignIn/Index';


const PrivateRoute: React.FC<{
    component: React.FC;
        path: string;
        exact: boolean;
    }> = (props) => (
    <Route path={props.path}  exact={props.exact} component={props.component} 
      render={routeProps =>
        signIn() ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: window.location.reload()} }} />
        )
      }
    />
    );

 /* const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        signIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );*/



const AppRoutes: React.FC = () => (
                <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <PrivateRoute exact path="/app" component={NavigationMap} />
                    <PrivateRoute exact path="/selection" component={Selection} />
                    <PrivateRoute exact path="/usuarios/create" component={CreateUsuario} />
                    <PrivateRoute exact path="/doadores/create" component={CreateDoador} />
                    <PrivateRoute exact path="/colaboradores/create" component={CreateColaborador} />
                    <PrivateRoute exact path="/usuarios/:id" component={Usuario} />
                    <PrivateRoute exact path="/doadores/:id" component={Doador} />
                    <PrivateRoute exact path="/colaboradores/:id" component={Colaborador} />
                    <PrivateRoute exact path="/users/:id/change" component={ChangeUsuario} />
                    <PrivateRoute exact path="/donors/:id/change" component={ChangeDoador} />
                    <PrivateRoute exact path="/collaborators/:id/change" component={ChangeColaborador} />
                </Switch>
                </BrowserRouter>
    );

export default AppRoutes; 