/* eslint-disable */

import React, { Component, lazy } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import WaitingComponent from './components/Custom/theme/waiting';
import Main from './components/Main/main';
import './assets/dependencies';
import PrivateRoute from "./auth/privateRoute";

const Login = lazy(() => import('./components/Login/login'));
const CreateAnalysis = lazy(() => import('./components/Analysis/createAnalysis'));
const ListAnalysis = lazy(() => import('./components/Analysis/listAnalysis'));
const EditAnalysis = lazy(() => import('./components/Analysis/editAnalysis'));

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={WaitingComponent(Login)} />
          <PrivateRoute path="/analysis/create" component={WaitingComponent(CreateAnalysis)} />
          <PrivateRoute path={"/analysis/:year"} component={WaitingComponent(EditAnalysis)} />
          <PrivateRoute path="/analysis" component={WaitingComponent(ListAnalysis)} />
          <Redirect to={"/"} />
        </Switch>
      </div>
    );
  }
}
