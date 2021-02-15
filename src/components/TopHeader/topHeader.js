
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom';
import {smoothlyMenu} from '../../helpers/helpers';
import $ from 'jquery';
import * as auth from '../../auth/auth';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import { useHistory } from "react-router-dom";

const TopHeader = (props) => {

    const history = useHistory();

    const logout = () => {
        auth.logout();
        history.push('/');
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
        <div className="row border-bottom font-weight-bold">
            <nav className="navbar navbar-expand-lg navbar-light w-100" role="navigation" style={{marginBottom: 0}}>
                <div className="navbar-header">
                        <span className="navbar-minimalize minimalize-styl-2 btn btn-primary"
                              onClick={(e) => toggleNavigation(e)} style={{cursor: 'pointer'}}><i
                            className="fa fa-bars"/> </span>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="ml-auto pl-4 collapse navbar-collapse" id="navbarText">
                    {localStorage.getItem('auth_token') == null ? (
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className={"nav-item"}>
                                <a className={i18n.language === "en" ? "border-right nav-link active" : "border-right nav-link "} onClick={() => handleClick('en')}>EN</a>
                            </li>
                            <li className={"mr-2 nav-item"}>
                                <a className={i18n.language === "mk" ? "nav-link active" : "nav-link "} onClick={() => handleClick('mk')}>MK</a>
                            </li>

                            <li className={"nav-item pr-3"}>
                                <NavLink to={"/login"} className='nav-link custom_font' activeClassName='active'>
                                    <i className="fa fa-sign-in pr-2"/>
                                    {t('Log in')}
                                </NavLink>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0 pr-3">
                            <li className={"nav-item "}>
                                <a className={i18n.language === "en" ? "border-right nav-link active" : "border-right nav-link "} onClick={() => handleClick('en')}>EN</a>
                            </li>
                            <li className={"mr-2 nav-item"}>
                                <a  className={i18n.language === "mk" ? "nav-link active" : " nav-link "} onClick={() => handleClick('mk')}>MK</a>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to={"/"} className={'nav-link'} activeClassName='active'>
                                    {t('Home')}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/analysis"} className={'nav-link'} activeClassName='active'>
                                    {t('Analysis')}
                                </NavLink>
                            </li>
                            <li className={"nav-item "}>
                                <a href={"#"} onClick={logout} className={"nav-link"}>
                                    {/*<span className="p-3"> {localStorage.getItem('user')}</span>*/}
                                    <i className="fa fa-sign-out"/>
                                    <span className="checkbox-label">
                                    {t('Log out')}
                                </span></a>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    );
};

TopHeader.propTypes = {
    history: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ }, dispatch);
export default withRouter(connect(null, mapDispatchToProps)(TopHeader));