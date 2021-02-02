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
        if (window.confirm("Do you want to delete this analysis?")){
            this.setState((prevState) => {
                const newValue = {
                    loading: true
                }
                return {
                    ...prevState,
                    ...newValue
                }
            })
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
            <div className="container p-5 m-auto bg-white mx-auto">
                <div className="row">
                    <a href={"/analysis/create"} className="btn btn-primary">Add new Analysis</a>
                </div>
                {
                    this.state.analysis.length > 0 && !this.state.loading ?
                         <table className="table table-hover table-responsive-lg table-light">
                            <thead>
                                <tr>
                                    <td>Year</td>
                                    <td>Actions</td>
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
                                                <a href={`/analysis/${analysis.year}`} className="btn btn-warning mx-2">Edit</a>
                                                <button className={"btn btn-danger mx-2"} name={analysis.id} onClick={this.deleteAnalysis} >Delete</button>
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
