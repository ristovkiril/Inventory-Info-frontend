import React, {Component} from 'react';

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';
import analysis from "../../redux/reducers/analysis";
import TopHeader from "../topHeader";
window.$ = jQuery;

class CreateAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            analysis: {},
            file: [],
            loading: true
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
        })
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
                console.log(this.state)
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
            alert("Error, try again!");
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <TopHeader/>
                <div className="container p-5 mt-3 bg-white shadow">
                    <form onSubmit={this.saveAnalysis}>
                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   name="year"
                                   placeholder="Year"
                                   value={this.state.analysis.year}
                                   onChange={this.onChange}
                                   required={true}/>
                        </div>
                        <div className="form-group">
                            <input id="file"
                                   name="file"
                                   type="file"
                                   className="form-control-file"
                                   onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <button type={"submit"} className="btn btn-primary" >Save</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}



export default CreateAnalysis;
