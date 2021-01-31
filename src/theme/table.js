import React, {Component} from 'react';

export class Table extends Component {

    getCategories = () => {
        return [...new Set(this.props.selected.map(row => row.category.name))]
    };

    getAnalysis = () => {
        if (this.props.isYearly){
            return [...new Set(this.props.selected.map(row => row.gas.name))]
        } else {
            return [...new Set(this.props.selected.map(row => row.year.year))]
        }
    };

    findByCategoryAndGas = (cat, gas) => {
        const row = this.props.selected
            .find((e) => e.category.name === cat && e.gas.name === gas);
        return row.concentrate.toFixed(2)
    };

    findByCategoryAndYear = (cat, year) => {
        const row = this.props.selected
            .find((e) => e.category.name === cat && e.year.year === year);
        return row.concentrate.toFixed(2)

    };



    render() {
        return (
            <table className="table table-hover table-responsive-lg">
                <thead className="bg-light m-0 p-0">
                <tr>
                    <th className="font-weight-bold">Категории</th>
                    {
                        this.getAnalysis().map(analysis => <th key={analysis} className="font-weight-bold border-light border-left text-center">{analysis}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    this.getCategories().map((name) =>
                        <tr key={name}>
                            <td className="bg-light font-weight-bold">{name}</td>
                            {
                                this.getAnalysis().map(analysis =>
                                        <td key={analysis + name} className="border-light border-left text-center">
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