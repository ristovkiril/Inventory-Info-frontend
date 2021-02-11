import React, {Component} from 'react';

import Loading from '../Loading/loading'

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';
import TopHeader from "../TopHeader/topHeader";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';


import {withTranslation} from "react-i18next";

window.$ = jQuery;

class CreateAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            analysis: [],
            loading: true,
            showDialog: false,
            deleteId: null
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
            console.log(this.state)

        })
    };

    deleteAnalysis = (id) => {
        if (id !== null) {
            this.setState((prevState) => {
                const newValue = {
                    loading: true,
                    showDialog: false,
                    deleteId: null
                };
                return {
                    ...prevState,
                    ...newValue
                }
            });
            axios.deleteYear(id)
                .then(response => {
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
                    console.log(this.state)
                })
                .catch((error) => {
                    if (error.response.status === 403){
                        localStorage.clear();
                        this.setError("Please login again.")
                    }
                    else
                        this.setError("Something went wrong, please try again.")
                })
        }
    };

    changeShowDialog = (id) => {
        this.setState((prevState) => {
            const newValue = {
                showDialog: !prevState.showDialog,
                deleteId: id
            }
            return {
                ...prevState,
                ...newValue
            }
        })
    }

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
                    <div>
                        {
                            this.state.analysis.length === 0 ?  <h3>No analysis yet</h3> : ""
                        }
                    </div>
                    {
                        !this.state.loading ?
                            <table className="table table-hover table-responsive-sm table-light ">
                                <thead>
                                <tr>
                                    <td><h4>{this.props.t("Year")}</h4></td>
                                    <td><h4>{this.props.t("Actions")}</h4></td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                        this.state.analysis.sort((a, b)=> a.year - b.year).map(analysis => {
                                            return <tr key={analysis.year} >
                                                <td>
                                                    {analysis.year}
                                                </td>
                                                <td>
                                                    <a href={`/analysis/${analysis.year}`}
                                                       className="btn btn-link mx-2" title="Edit">
                                                        <i className="fa fa-file-text bg-light"/>
                                                    </a>
                                                    <button className={"btn btn-link mx-2"} name={analysis.year}
                                                            onClick={() => this.changeShowDialog(analysis.id)} title="Delete">
                                                        <i className="fa fa-trash "/>
                                                    </button>
                                                </td>
                                            </tr>
                                        })
                                }
                                </tbody>
                            </table> : <Loading/>
                    }
                </div>

                <Dialog
                    open={this.state.showDialog && this.state.deleteId !== null}
                    onClose={this.changeShowDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Please Confirm!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete analysis? This action is permanent,
                            and we're totally not just flipping a field called "deleted" to
                            "true" in our database, we're actually deleting something.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.changeShowDialog(null)} color="primary" autoFocus >
                            Cancel
                        </Button>
                        <Button onClick={() => this.deleteAnalysis(this.state.deleteId)}  className="bg-danger text-white" >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


export default withTranslation()(CreateAnalysis);
