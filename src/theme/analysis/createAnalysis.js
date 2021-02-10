import React, {Component} from 'react';

import Loading from '../loading';

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
            file: [],
            loading: false,
            error: false,
            errorMessage: ""
        }
    }

    onChange = (e) => {
        const name = e.target.name;
        let newValue = {};
        if (name === 'year' && !isNaN(e.target.value)){
            newValue = {
                year: e.target.value
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
    };

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
        }, (error) => {
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
                            <div>
                                <div className="mr-auto py-3">
                                    <a href={'/analysis'} className="h5">{this.props.t("Back")}</a>
                                </div>
                                <form onSubmit={this.createAnalysis}>
                                    <div className="form-group py-2">
                                        <label htmlFor="year">{this.props.t("Year")}</label>
                                        <input className="form-control"
                                               id="year"
                                               type="text"
                                               name="year"
                                               placeholder={this.props.t("Year")}
                                               value={this.state.year}
                                               onChange={this.onChange}
                                               required={true}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="file">{this.props.t("File")}</label>
                                        <input id="file"
                                               name="file"
                                               type="file"
                                               className="form-control-file"
                                               onChange={this.onChange}
                                               required={true} />
                                        <small>* {this.props.t("Upload Excel")}</small>
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
