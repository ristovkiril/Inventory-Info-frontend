import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { smoothlyMenu } from './helpers/helpers';
import $ from 'jquery';
import a4 from '../assets/img/a4.jpg';
import a7 from '../assets/img/a7.jpg';
import profile from '../assets/img/profile.jpg';
import * as auth from '../helpers/auth';
import PropTypes from 'prop-types';

class TopHeader extends Component {
  render() {
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
          <div className="navbar-header">
            <span className="navbar-minimalize minimalize-styl-2 btn btn-primary" onClick={(e) => this.toggleNavigation(e)} style={{ cursor: 'pointer' }}><i className="fa fa-bars"/> </span>

          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a onClick={this.logout}> <i className="fa fa-sign-out"/> Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  logout = () => {
    auth.logout();
    this.props.history.push('/');
  };

  toggleNavigation(e) {
    e.preventDefault();
    $('body').toggleClass('mini-navbar');
    smoothlyMenu();
  }
}

TopHeader.propTypes = {
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ }, dispatch);
export default withRouter(connect(null, mapDispatchToProps)(TopHeader));
