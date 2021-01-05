import React, {Component} from 'react';
import * as analysisActionCreator from "../redux/actions/gas_year_category";
import {connect} from "react-redux";

export class Table extends Component {

    getCategories = () => {
        return [...new Set(this.props.selected.map(row => row.category.name))]
    };

    getAnalysis = () => {
        if (this.props.isYearly){
            return [...new Set(this.props.selected.map(row => row.gas.name))]
        } else {
            return [...new Set(this.props.selected.map(row => row.analysis.year))]
        }
    };

    findByCategoryAndGas = (cat, gas) => {
        const row = this.props.selected
            .find((e) => e.category.name === cat && e.gas.name === gas);
        return row.concentrate.toFixed(2)
    };

    findByCategoryAndYear = (cat, year) => {
        const row = this.props.selected
            .find((e) => e.category.name === cat && e.analysis.year === year);
        return row.concentrate.toFixed(2)

    };



    render() {
        return (
            <table className="table table-hover">
                <thead className="">
                <tr>
                    <th>Категории</th>
                    {
                        this.getAnalysis().map(analysis => <th key={analysis}>{analysis}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    this.getCategories().map((name) =>
                        <tr key={name}>
                            <td>{name}</td>
                            {
                                this.getAnalysis().map(analysis => <td key={analysis + name}>
                                        { this.props.isYearly ?
                                    this.findByCategoryAndGas(name, analysis) : this.findByCategoryAndYear(name, analysis)
                                        }
                                </td>
                                )
                            }
                        </tr>
                    )
                }

                </tbody>
            </table>
        )
    }
}
export default Table;