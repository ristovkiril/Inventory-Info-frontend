import $ from 'jquery';
import React, {Component} from 'react';

import Loading from '../Loading/loading';
import Progress from './progress';
import Navigation from '../Navigation/navigation';
import TopHeader from '../TopHeader/topHeader';
import Footer from '../Footer/footer';
import Table from "../Table/table";
import Charts from "../Chart/charts";
import {correctHeight, detectBody} from '../../helpers/helpers';
import { withTranslation } from 'react-i18next';

import '../../assets/dependencies';
import * as analysisActionCreator from "../../redux/actions/gas_year_category";
import {connect} from "react-redux";

export class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isYearly: true,
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

    setTableView = (tableView) => {
        this.setState((prevState) => {
            const newValue = {
                'tableView': tableView
            }

            return {
                ...prevState,
                ...newValue
            }
        });
        // $('li .fa-table').addClass('active')

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
                    <div>
                        <Progress/>
                        <Navigation isYearly={this.state.isYearly}
                                    setAnalysis={this.setAnalysis}
                                    onSelected={this.props.onSelected}/>

                        <div id="page-wrapper" className="gray-bg">
                            <TopHeader/>
                            <div className="animated fadeInDown">
                                <div className="body wrapper wrapper-content animated">
                                        <ul className="nav nav-tabs border-bottom-0">
                                            <li className={this.state.tableView === true ? "nav-item active bg-white rounded-top border-bottom-0 pointer":"nav-item bg-light rounded-top pointer"}>
                                                <div className={this.state.tableView === true ? "nav-link active bg-white border-bottom-0 ":"nav-link bg-light rounded-top"} onClick={() => this.setTableView(true)}>
                                                    <i className="fa fa-table pr-1"/>
                                                    {this.props.t('tables')}
                                                </div>
                                            </li>
                                            <li className={this.state.tableView === false ? "nav-item active bg-white rounded-top pointer":"nav-item bg-light rounded-top pointer"}>
                                                <div className={this.state.tableView === false ? "nav-link active bg-white border-bottom-0 ":"nav-link bg-light rounded-top"} onClick={() => this.setTableView(false)}>
                                                    <i className="fa fa-bar-chart pr-1"/>
                                                    {this.props.t('charts')}
                                                </div>
                                            </li>
                                        </ul>
                                    <div className="ibox-content p-3 m-0 shadow font-weight-bold">
                                        {
                                            !this.props.selected || this.props.selected.length === 0 ? <Loading/>
                                            :
                                                    this.state.tableView ? (
                                                        <Table isYearly={this.state.isYearly}
                                                               selected={this.props.selected}/>
                                                    ) : (
                                                        <Charts isYearly={this.state.isYearly}
                                                                selected={this.props.selected}/>)
                                        }

                                    </div>
                                    </div>
                            </div>
                            <Footer/>
                        </div>
                    </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        selected: state.analysisReducer.selected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelected: (gasses, categories, analysis) => dispatch (analysisActionCreator.loadSelected(gasses, categories, analysis))
    };

};
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Main));
