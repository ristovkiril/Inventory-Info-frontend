import $ from 'jquery';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Progress from './progress';
import Navigation from './navigation';
import TopHeader from './topHeader';
import Footer from './footer';
import {correctHeight, detectBody} from './helpers/helpers';

import '../assets/dependencies';

export default class Main extends Component {
    componentDidMount() {
        // eslint-disable-next-line func-names
        $(window).bind('load resize', function () {
            correctHeight();
            detectBody();
        });
    }

    render() {
        return (
            <div id="wrapper">
                <BrowserRouter>
                    <div>
                        <Progress/>
                        <Navigation/>
                        <div id="page-wrapper" className="gray-bg">
                            <TopHeader/>
                            <div className="animated fadeInDown">
                                <div className="body">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a href="#" className=""><i className="fa fa-table"/>Табели</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link"><i className="fa fa-bar-chart"/>Графици</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
