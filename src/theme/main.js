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
import * as analysisActionCreator from "../redux/actions/gas_year_category";
import {connect} from "react-redux";

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isYearly: false,
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

    setAnalysis = () => {
        this.setState((prevState) => {
            const newValue = {
                'isYearly': !prevState.isYearly
            };

            return {
                ...prevState,
                ...newValue
            }
        })
    };

    render() {
        return (
            <div id="wrapper">
                <BrowserRouter>
                    <div>
                        <Progress/>
                        <Navigation isYearly={this.state.isYearly}
                                    setAnalysis={this.setAnalysis}
                                    onSelected={this.props.onSelected}/>
                        <div id="page-wrapper" className="gray-bg">
                            <TopHeader/>
                            <div className="animated fadeInDown">
                                <div className="body wrapper wrapper-content animated">
                                        <ul className="nav nav-tabs">
                                            <li className={this.state.tableView === true ? "nav-item active bg-white":"nav-item"}>
                                                <a href="#" className="nav-link" onClick={this.seTableView}><i className="fa fa-table"/>Табели</a>
                                            </li>
                                            <li className={this.state.tableView === false ? "nav-item active bg-white":"nav-item"}>
                                                <a href="#" className="nav-link" onClick={this.setChartView}><i
                                                    className="fa fa-bar-chart"/>Графици</a>
                                            </li>
                                        </ul>
                                    <div className="ibox-content">
                                        {
                                            this.state.tableView ? (
                                                <Table isYearly={this.state.isYearly}
                                                       selected={this.props.selected}/>
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
const mapStateToProps = (state) => {
    return{
        // analysis: state.analysisReducer.analysis
        selected: state.analysisReducer.selected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getAnalysis: () => dispatch(analysisActionCreator.loadAnalysis()),
        onSelected: (gasses, categories, analysis) => dispatch (analysisActionCreator.loadSelected(gasses, categories, analysis))
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Main);