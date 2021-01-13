import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { smoothlyMenu } from './helpers/helpers';
import $ from 'jquery';
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
                {localStorage.getItem('auth_token') == null ? (
                    <a href={"/react-inspinia#/login"}>
                      <i className="fa fa-sign-in"/>
                      Најавете се</a>
                ) : (
                    <div>
                        <a onClick={this.logout}>
                            <span className="p-3"> {localStorage.getItem('user')}</span>
                            <i className="fa fa-sign-out"/>
                            <span className="checkbox-label">Одјавете се</span></a>
                    </div>
                )}
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
