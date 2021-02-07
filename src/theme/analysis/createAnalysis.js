import React, {Component} from 'react';

import Loading from '../loading';

import jQuery from 'jquery';
import axios from '../../axios/axios-repository';
import TopHeader from "../topHeader";

window.$ = jQuery;

class CreateAnalysis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            file: [],
            loading: false
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
                console.log(this.state)
            })
        }
    };

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
            this.props.history.push('/');
        }, (error) => {
            alert("Error, try again!");
            console.log(error);
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
                            <form onSubmit={this.createAnalysis}>
                                <div className="form-group">
                                    <input className="form-control"
                                           type="text"
                                           name="year"
                                           placeholder="Year"
                                           value={this.state.year}
                                           onChange={this.onChange}
                                           required={true}/>
                                </div>
                                <div className="form-group">
                                    <input id="file"
                                           name="file"
                                           type="file"
                                           className="form-control-file"
                                           onChange={this.onChange}
                                           required={true} />
                                </div>
                                <div className="form-group">
                                    <button type={"submit"} className="btn btn-primary" >Create</button>
                                </div>
                            </form>
                    }
                </div>
            </div>

        );
    }
}



export default CreateAnalysis;
