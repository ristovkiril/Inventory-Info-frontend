import React, { Component } from 'react';

class LoginForm extends Component{
    render() {
        return(
            <form className="m-t" role="form" action="#">
                <div className="form-group">
                    <input type="email" name="email" className="form-control" placeholder={'Email'} required=""/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" className="form-control" placeholder={'Password'} required=""/>
                </div>

                <button type="button" id="btnLogin" className="btn btn-primary block full-width m-b">{'Login'}</button>
                <a href="#">
                    <small>Forgot Password</small>
                </a>
            </form>
        )
    }
}