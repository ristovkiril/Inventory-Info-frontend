import React, {Component} from 'react';

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';
import TopHeader from "../topHeader";
import {withTranslation} from "react-i18next";

import AlertDialog from "../dialog/alertDialog";

window.$ = jQuery;

class CreateAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            analysis: {},
            file: [],
            loading: true,
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        const { match: {params}} = this.props;
        this.loadAnalysis(params.year)
    }

    loadAnalysis = (year) => {
        axios.getYear(year).then((response) => {
            this.setState((prevState) => {
                const newValue = {
                    year: year,
                    analysis: response.data,
                    loading: false
                }

                return {
                    ...prevState,
                    ...newValue
                }
            })
        }, (error) => {
           this.setError("Year not found, please try again!");
        }).catch((error) => {
            this.setError("Year not found, please try again!");
        })
    }

    setError = (message = "") => {
        this.setState(prevState => {
            const newValue = {
                error: !prevState.error,
                errorMessage: message
            }
            return {
                ...prevState,
                ...newValue
            }
        })
    }

    handleError = () => {
        this.setError();
        this.props.history.push("/analysis");
    }

    onChange = (e) => {
        const name = e.target.name;
        let newValue = {};
        if (name === 'year' && !isNaN(e.target.value)){
            const analysis = this.state.analysis;
            analysis.year = e.target.value;
            newValue = {
                analysis: analysis
            }
        } else if (name === 'file') {
            newValue = {
                file: e.target.files[0]
            }
        }
        if (newValue !== {}) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    ...newValue
                }
            }, () => {
            })
        }
    }

    saveAnalysis = (e) => {
        e.preventDefault();
        //Loading while waiting to upload
        this.setState((prevState) => {
            const newValue = {
                loading: true
            }
            return {
                ...prevState,
                ...newValue
            }
        })


        this.saveFile();
    }

    saveFile = () => {
        const files = new FormData();
        if (this.state.file !== [] && this.state.file !== undefined) {
            files.append("file", this.state.file);
        }
        files.append('newYear', this.state.analysis.year)
        axios.editYear(this.state.year, files).then((response) => {
            this.setState((prevState) => {
                const newValue = {
                    loading: false
                }
                return {
                    ...prevState,
                    ...newValue
                }
            })
            this.props.history.push('/analysis');
        }, (error) => {
            if (error.response.status === 403){
                localStorage.clear();
                this.setError("Please login again.")
            }
            else
                this.setError("There was error, please try again!");
        })
    }

    render() {
        return (
            <div>
                <TopHeader/>
                <div className="container p-5 mt-3 bg-white shadow">
                    <div className="mr-auto py-3">
                        <a href={'/analysis'} className="h5">{this.props.t("Back")}</a>
                    </div>
                    <form onSubmit={this.saveAnalysis}>
                        <div className="form-group py-2">
                            <label htmlFor="year">{this.props.t("Year")}</label>
                            <input className="form-control"
                                   type="text"
                                   name="year"
                                   placeholder={this.props.t("Year")}
                                   value={this.state.analysis !== null ? this.state.analysis.year : ""}
                                   onChange={this.onChange}
                                   required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">{this.props.t("Year")}</label>
                            <input id="file"
                                   name="file"
                                   type="file"
                                   className="form-control-file"
                                   onChange={this.onChange}
                            />
                            <small>* {this.props.t("Upload Excel")}</small><br/>
                            <small>* {this.props.t("This field is optional")}</small>
                        </div>
                        <div className="form-group">
                            <button type={"submit"} className="btn btn-primary" >{this.props.t("Save")}</button>
                        </div>
                    </form>
                </div>

                <AlertDialog error={this.state.error} message={this.state.errorMessage} handleError={this.handleError} />
            </div>

        );
    }
}



export default withTranslation()(CreateAnalysis);
