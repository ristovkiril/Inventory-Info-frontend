import React, {Component} from 'react';

import Loading from '../loading'

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';

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
                }
                return {
                    ...prevState,
                    ...newValue
                }
            })
        })
    }

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
                    }
                    return {
                        ...prevState,
                        ...newValue
                    }
                })
            })
        }

    }

    render() {
        return (
            <div className="container p-5 m-auto bg-white mx-auto text-center">
                <div className="row pl-5 pb-3 pull-right">
                    <span className="pr-2">
                        <a href={"/analysis/create"} className="btn btn-primary font-weight-bolder">Add new Analysis</a>
                    </span>
                    <a href={"/"} className="btn btn-primary font-weight-bolder">Home</a>
                </div>
                {
                    this.state.analysis.length > 0 && !this.state.loading ?
                        <table className="table table-hover table-responsive-lg table-light">
                            <thead>
                            <tr>
                                <td><h4>Year</h4></td>
                                <td><h4>Actions</h4></td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.analysis.length > 0 ?
                                    this.state.analysis.map(analysis => {
                                        return <tr>
                                            <td>
                                                {analysis.year}
                                            </td>
                                            <td>
                                                <a href={`/analysis/${analysis.year}`}
                                                   className="btn btn-warning mx-2"> Edit
                                                    <i className="pl-2 fa fa-file-text"/>
                                                </a>
                                                <button className={"btn btn-danger mx-2"} name={analysis.id}
                                                        onClick={this.deleteAnalysis} title="Delete">
                                                    <i className="fa fa-trash"/>
                                                </button>
                                            </td>
                                        </tr>
                                    }) : ""
                            }
                            </tbody>
                        </table> : <Loading/>

                }
            </div>
        );


    }
}


export default CreateAnalysis;
