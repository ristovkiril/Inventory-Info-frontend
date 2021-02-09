import React, {Component} from 'react';

import Loading from '../loading'

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';
import TopHeader from "../topHeader";

import {withTranslation} from "react-i18next";

window.$ = jQuery;

class CreateAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            analysis: [],
            loading: true
        }
    }

    componentDidMount() {
        this.loadAnalysis();
    }

    loadAnalysis = () => {
        axios.getYears().then((response) => {
            this.setState((prevState) => {
                const newValue = {
                    analysis: response.data,
                    loading: false
                };
                return {
                    ...prevState,
                    ...newValue
                }
            })
        })
    };

    deleteAnalysis = (e) => {
        const id = e.target.name;
        if (window.confirm("Do you want to delete this analysis?")) {
            this.setState((prevState) => {
                const newValue = {
                    loading: true
                };
                return {
                    ...prevState,
                    ...newValue
                }
            });
            axios.deleteYear(id).then(response => {
                const analysis = this.state.analysis.filter(a => a.id !== parseInt(id));
                this.setState((prevState) => {
                    const newValue = {
                        analysis: analysis,
                        loading: false
                    };
                    return {
                        ...prevState,
                        ...newValue
                    }
                })
            })
        }
    };

    render() {
        return (
            <div >
                <TopHeader/>
                <div className="container p-5  bg-white mx-auto text-center shadow mt-3">
                    <div className="row pl-3 pb-3">
                        <div className=" mr-auto">
                            <a href={"/analysis/create"} className="btn btn-primary font-weight-bolder">{this.props.t('Upload')}</a>
                        </div>
                    </div>
                    {
                        this.state.analysis.length > 0 && !this.state.loading ?
                            <table className="table table-hover table-responsive-lg table-light">
                                <thead>
                                <tr>
                                    <td><h4>{this.props.t("Year")}</h4></td>
                                    <td><h4>{this.props.t("Actions")}</h4></td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.analysis.length > 0 ?
                                        this.state.analysis.map(analysis => {
                                            return <tr key={analysis.year}>
                                                <td>
                                                    {analysis.year}
                                                </td>
                                                <td>
                                                    <a href={`/analysis/${analysis.year}`}
                                                       className="btn btn-link mx-2">
                                                        <i className="fa fa-file-text bg-light"/>
                                                    </a>
                                                    <button className={"btn btn-link mx-2"} name={analysis.id}
                                                            onClick={this.deleteAnalysis} title="Delete">
                                                        <i className="fa fa-trash "/>
                                                    </button>
                                                </td>
                                            </tr>
                                        }) : ""
                                }
                                </tbody>
                            </table> : <Loading/>
                    }
                </div>
            </div>
        );
    }
}


export default withTranslation()(CreateAnalysis);
