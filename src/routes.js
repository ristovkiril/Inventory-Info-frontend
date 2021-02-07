/* eslint-disable */

import React, { Component, lazy } from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import PublicRoute from './components/common/publicRoute';
import WaitingComponent from './theme/waiting';
import Main from './theme/main';
import './assets/dependencies';
import PrivateRoute from "./components/common/privateRoute";

const Login = lazy(() => import('./components/common/login'));
// const Lock = lazy(() => import('./components/common/lock'));
// const Activate = lazy(() => import('./components/common/activate'));
const Register = lazy(() => import('./components/common/register'));
const CreateAnalysis = lazy(() => import('./theme/analysis/createAnalysis'));
const ListAnalysis = lazy(() => import('./theme/analysis/listAnalysis'));
const EditAnalysis = lazy(() => import('./theme/analysis/editAnalysis'));
// const AppRoutes = lazy(() => import('./appRoutes'));

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={WaitingComponent(Login)} />
          <PublicRoute path="/register" component={WaitingComponent(Register)} />
          {/*<PublicRoute path="/lock" component={WaitingComponent(Lock)} />*/}
          {/*<PublicRoute path="/activate" component={WaitingComponent(Activate)} />*/}
          <PrivateRoute path="/analysis/create" component={WaitingComponent(CreateAnalysis)} />
          <PrivateRoute path={"/analysis/:year"} component={WaitingComponent(EditAnalysis)} />
          <PrivateRoute path="/analysis" component={WaitingComponent(ListAnalysis)} />
          {/*<PrivateRoute path="/app" component={WaitingComponent(AppRoutes)} />*/}
          {/*<Redirect to={"/"} />*/}
        </Switch>
      </div>
    );
  }
}
