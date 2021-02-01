/* eslint-disable */
import $ from 'jquery';
import React, { Component, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Progress from './theme/progress';
import Navigation from './theme/navigation';
import TopHeader from './theme/topHeader';
import Footer from './theme/footer';
import { correctHeight, detectBody } from './theme/helpers/helpers';
import WaitingComponent from './theme/waiting';

const Dashboard = lazy(() => import('./components/pages/dashboard'));
const Inbox = lazy(() => import('./components/pages/inbox'));
const Compose = lazy(() => import('./components/pages/compose'));
const Contacts = lazy(() => import('./components/pages/contacts'));
const Home = lazy(() => import('./components/pages/home'));
const Profile = lazy(() => import('./components/pages/profile'));
const Permissions = lazy(() => import('./components/pages/permissions'));
const NotFound = lazy(() => import('./components/common/notFound'));

export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match: props.match
    };
  }

  componentDidMount() {
    // eslint-disable-next-line func-names
    $(window).bind('load resize', function() {
      correctHeight();
      detectBody();
    });
  }

  render() {
    return (
      <div id="wrapper" className="app">
        <Progress />
        <Navigation />
        <div id="page-wrapper" className="gray-bg">
          <TopHeader />
          <Switch>
            <Route path={`/`} exact component={Home} />
            <Route path={`/inbox`} exact component={WaitingComponent(Inbox)} />
            <Route path={`/compose`} exact component={WaitingComponent(Compose)} />
            <Route path={`/contacts`} exact component={WaitingComponent(Contacts)} />
            <Route path={`/profile`} exact component={WaitingComponent(Profile)} />
            <Route path={`/dashboard`} exact component={WaitingComponent(Dashboard)} />
            <Route path={`/home`} exact component={WaitingComponent(Home)} />
            <Route path={`/permissions`} exact component={WaitingComponent(Permissions)} />
            <Route component={Home}/>
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

