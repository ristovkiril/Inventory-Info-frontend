import React, {Component} from 'react';

import Loading from '../Loading/loading';

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';
import TopHeader from "../TopHeader/topHeader";

import {withTranslation} from "react-i18next";
import AlertDialog from "../Dialog/alertDialog";
import Datetime from "react-datetime";

import 'moment'
import 'react-datetime/css/react-datetime.css';
import Dropzone from "./Dropzone";

window.$ = jQuery;

class CreateAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: new Date().getUTCFullYear(),
            file: [],
            loading: false,
            error: false,
            errorMessage: "",
            isOpen: false
        }
    }

    onChangeYear = (year) => {
        this.setState(prevState => {
            return {
                ...prevState,
                year: new Date(year).getFullYear()
            }
        })
    }

    onChangeFile = (file) => {
       this.setState((prevState) => {
           const newValue = {
               file: file[0]
           }
            return {
                ...prevState,
                ...newValue
            }
        }, () => {})

    };

    setError = (message = "") => {
        this.setState(prevState => {
            const newValue = {
                error: !prevState.error,
                errorMessage: message,
                loading: false
            }
            return {
                ...prevState,
                ...newValue
            }
        })
    }

    handleError = () => {
        this.setError();
        // this.props.history.push("/analysis");
    }

    createAnalysis = (e) => {
        e.preventDefault();
        const files = new FormData();
        files.append("file", this.state.file);
        files.append("year", this.state.year);

        this.setState((prevState) => {
            const newValue = {
                loading: true
            };
            return {
                ...prevState,
                ...newValue
            }
        });

        axios.createAnalysis(this.state.year, files).then((response)=>{
            console.log(response.status);
            this.setState((prevState) => {
                const newValue = {
                    loading: false
                };
                return {
                    ...prevState,
                    ...newValue
                }
            });
            this.props.history.push('/analysis');
        }).catch((error) => {
            if (error.response.status === 403){
                localStorage.clear();
                this.setError("Please login again.")
            }
            else
                this.setError("There was error, please try again!");
        })
    };

    render() {
        return (
            <div>
                <TopHeader/>

                <div className="container p-5 mt-3 bg-white shadow">
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <div className={"col-sm-12 col-md-6"}>
                                <div className="mr-auto py-3">
                                    <a href={'/analysis'} className="h5">{this.props.t("Back")}</a>
                                </div>
                                <form onSubmit={this.createAnalysis}>
                                    <div className="form-group py-2">
                                        <label htmlFor="year">{this.props.t("Year")}</label>
                                        <Datetime
                                            onChange={this.onChangeYear}
                                            dateFormat={"YYYY"}
                                            timeFormat={false}
                                            closeOnSelect={true}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <Dropzone setFile={this.onChangeFile} files={this.state.file} />
                                    </div>
                                    <div className={"form-group"}>
                                        <small>* {this.props.t("Upload Excel")} (*.xlsx)</small><br/>
                                    </div>
                                    <div className="form-group">
                                        <button type={"submit"} className="btn btn-primary" >{this.props.t("Create")}</button>
                                    </div>
                                </form>
                            </div>

                    }
                </div>
                <AlertDialog error={this.state.error} message={this.state.errorMessage} handleError={this.handleError} />

            </div>

        );
    }
}



export default withTranslation()(CreateAnalysis);
