import React, {Component} from 'react';

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';
import analysis from "../../redux/reducers/analysis";
window.$ = jQuery;

class CreateAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            analysis: {},
            file: []
        }
    }

    componentDidMount() {
        const { match: {params}} = this.props;
        this.loadAnalysis(params.year)
    }

    loadAnalysis = (year) => {
        axios.getYear(year).then((response) => {
            console.log(response.data);
            this.setState((prevState) => {
                const newValue = {
                    year: year,
                    analysis: response.data
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
        if (this.state.analysis.year !== this.state.year){
            axios.editYear(this.state.year, this.state.analysis.year).then((response) => {
                if (this.state.file !== [] && this.state.file !== undefined) {
                    this.saveFile();
                } else {
                    this.props.history.push('/analysis');
                }
            })
        }
        else if (this.state.file !== [] && this.state.file !== undefined) {
            this.saveFile();
        }
    }

    saveFile = () => {
        const files = new FormData();
        files.append("file", this.state.file);
        axios.createAnalysis(this.state.analysis.year, files).then((response) => {
            this.props.history.push('/');
        }, (error) => {
            alert("Error, try again!");
            console.log(error);
        })
    }

    render() {
        return (
            <div className="container p-5 m-auto bg-white">
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

        );
    }
}



export default CreateAnalysis;
