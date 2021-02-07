import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {smoothlyMenu} from './helpers/helpers';
import $ from 'jquery';
import * as auth from '../helpers/auth';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';

const TopHeader = (props) => {

    const logout = () => {
        auth.logout();
        // props.history.push('/');
    };

    const toggleNavigation = (e) => {
        e.preventDefault();
        $('body').toggleClass('mini-navbar');
        smoothlyMenu();
    };

    const {t, i18n} = useTranslation();
    function handleClick(lang) {
        i18n.changeLanguage(lang)
    }


    return (
        <div className="row border-bottom">
            <nav className="navbar navbar-static-top" role="navigation" style={{marginBottom: 0}}>
                <div className="navbar-header">
                        <span className="navbar-minimalize minimalize-styl-2 btn btn-primary"
                              onClick={(e) => toggleNavigation(e)} style={{cursor: 'pointer'}}><i
                            className="fa fa-bars"/> </span>
                </div>
                {localStorage.getItem('auth_token') == null ? (
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <a href={"/"} onClick={() => handleClick('en')}>EN</a>
                        </li>
                        <li>
                            <a href={"/"} onClick={() => handleClick('mk')}>MK</a>
                        </li>
                        <li>
                            <a href={`/login`}>
                                <i className="fa fa-sign-in"/>
                                {t('Log in.1')}
                            </a>
                        </li>
                    </ul>
                ) : (
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <a href={"/"} onClick={() => handleClick('en')}>EN</a> |
                        </li>
                        <li>
                            <a href={"/"} onClick={() => handleClick('mk')}>MK</a>
                        </li>

                        <li>
                            <a href={"/analysis"}>Analysis</a>
                        </li>
                        <li>
                            <a onClick={logout}>
                                {/*<span className="p-3"> {localStorage.getItem('user')}</span>*/}
                                <i className="fa fa-sign-out"/>
                                <span className="checkbox-label">Одјавете се</span></a>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
};

// TopHeader.propTypes = {
//     history: PropTypes.object.isRequired
// };

export default TopHeader