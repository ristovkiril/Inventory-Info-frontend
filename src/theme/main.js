import $ from 'jquery';
import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Progress from './progress';
import Navigation from './navigation';
import TopHeader from './topHeader';
import Footer from './footer';
import {correctHeight, detectBody} from './helpers/helpers';

import '../assets/dependencies';
import Table from "./table";

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tableView: true
        }
    }

    componentDidMount() {
        // eslint-disable-next-line func-names
        $(window).bind('load resize', function () {
            correctHeight();
            detectBody();
        });
    }

    seTableView = () => {
        this.setState({
            tableView: true
        });
        // $('li .fa-table').addClass('active')

    };

    setChartView = () => {
        this.setState({
            tableView: false
        });
    };


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
                                <div className="body wrapper wrapper-content animated">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a href="#" onClick={this.seTableView}><i className="fa fa-table"/>Табели</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#" className="nav-link" onClick={this.setChartView}><i
                                                    className="fa fa-bar-chart"/>Графици</a>
                                            </li>
                                        </ul>
                                    <div className="ibox-content">
                                        {
                                            this.state.tableView ? (
                                                <Table/>
                                            ) : (
                                                <h1>Angela</h1>
                                            )
                                        }
                                    </div>
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
