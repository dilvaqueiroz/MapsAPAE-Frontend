import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Landing from '../pages/SignIn/Index';


const AuthRoutes: React.FC = () => (
    <Switch>
        <BrowserRouter>
            <Route exact  path="/" component={Landing} />
        </BrowserRouter>
    </Switch>
);
    
export default AuthRoutes;