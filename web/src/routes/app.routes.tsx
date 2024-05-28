import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Usuario from '../pages/Dashboard/Usuario';
import CreateUsuario from '../pages/Dashboard/CreateUsuario'
import NavigationMap from '../pages/Dashboard/Index';
import ChangeUsuario from '../pages/Dashboard/ChangeUsuario';
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
                    <PrivateRoute exact path="/usuarios/create" component={CreateUsuario} />
                    <PrivateRoute exact path="/usuarios/:id" component={Usuario} />
                    <PrivateRoute exact path="/users/:id/change" component={ChangeUsuario} />
                </Switch>
                </BrowserRouter>
    );

export default AppRoutes; 