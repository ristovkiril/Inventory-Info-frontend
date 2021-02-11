import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

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
            <div>
                <div className="mr-auto p-1">
                    <small>
                        {this.props.t("Units")}: [Gg]
                    </small>
                </div>
                <table className="table table-hover table-responsive-sm table_font table-bordered">
                    <thead className="bg-light m-0 p-0">
                    <tr>
                        <th className="font-weight-bold">
                            {this.props.t('Categories')}
                        </th>
                        {
                            this.getAnalysis().map(analysis => <th key={analysis} className="font-weight-bold border-light border-left text-center">
                                {this.props.t(analysis)}
                            </th>)
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.getCategories().map((category) =>
                            <tr key={category}>
                                <td className="bg-light font-weight-bold">
                                    {this.props.t(category)}
                                </td>
                                {
                                    this.getAnalysis().map(analysis =>
                                        <td key={analysis + category} className=" border-left text-center">
                                            { this.props.isYearly ?
                                                this.findByCategoryAndGas(category, analysis) : this.findByCategoryAndYear(category, analysis)
                                            }
                                        </td>
                                    )
                                }
                            </tr>
                        )
                    }

                    </tbody>
                </table>
            </div>
        )
    }
}
export default withTranslation() (Table);