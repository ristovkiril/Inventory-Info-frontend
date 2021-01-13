import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { get, isEmpty } from 'lodash';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import EnhancedSwitch from 'react-icheck/lib/EnhancedSwitch';
import axios from '../../axios/axios-repository';

import '../../assets/dependencies';
import config from '../../config';
import LoginForm from '../forms/login';
import CopyRight from '../../theme/copyRight';
import Loading from '../../theme/loading';
import { login } from '../../redux/actions/user';
import * as auth from '../../helpers/auth';
import { correctHeight, detectBody } from '../../theme/helpers/helpers';
import { createLoadingSelector, createErrorMessageSelector } from '../../redux/api/selectors';
import { toastr } from 'react-redux-toastr';

EnhancedSwitch.propTypes = {
  ...EnhancedSwitch.propTypes,
  cursor: PropTypes.string
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // eslint-disable-next-line func-names
    $(window).bind('load resize', function () {
      correctHeight();
      detectBody();
    });
  }

  login = (authInfo, callback) => {
    axios.login(authInfo).then((response) => {
      callback(response);
    })
  };

render() {
    if (this.props.loading) {
      return <Loading/>;
    }
    if (this.props.error) {
      toastr.error('!', this.props.error);
    }

    return (
        <div className="gray-bg">
          <div className="middle-box text-center loginscreen animated fadeInDown" style={{paddingBottom: '40px'}}>

            <LoginForm login={this.login}/>

            <Link to="/activate">
              <small>Forgot Password?</small>
            </Link>

            {/*<p className="text-muted text-center">*/}
            {/*  <Link to="/register">Don't have an account?</Link>*/}
            {/*</p>*/}
            <Link className="btn btn-sm btn-white btn-block" to="/activate">Activate Account</Link>
            <Link className="btn btn-sm btn-white btn-block" to="/register">Register</Link>
            <br/>
            <CopyRight/>
          </div>
        </div>
    );
  }

}
export default Login