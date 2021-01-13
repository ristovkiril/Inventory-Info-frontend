import React, { Component } from 'react';
import Loading from "../../theme/loading";
import {toastr} from "react-redux-toastr";
import {Link} from "react-router-dom";
import CopyRight from "../../theme/copyRight";
import LoginForm from '../forms/login';

export class Login extends Component{

    render() {
        if (this.props.loading) {return <Loading/>;}
        if (this.props.error) {toastr.error('!', this.props.error);}

        return (
            <div className="gray-bg">
                <div className="middle-box text-center loginscreen animated fadeInDown" style={{ paddingBottom: '40px' }}>

                    <LoginForm onSubmit={this.login} />

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