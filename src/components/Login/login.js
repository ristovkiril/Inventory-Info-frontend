import $ from 'jquery';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EnhancedSwitch from 'react-icheck/lib/EnhancedSwitch';
import axios from '../../axios/axios-repository';

import '../../assets/dependencies';
import LoginForm from '../forms/login';
import CopyRight from '../Footer/copyRight';
import Loading from '../Loading/loading';
import { correctHeight, detectBody } from '../../helpers/helpers';
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

            <br/>
            <CopyRight/>
          </div>
        </div>
    );
  }

}
export default Login