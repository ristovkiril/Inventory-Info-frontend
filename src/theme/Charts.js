import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export class Charts extends Component {

    // obraten slucaj
    getDataset = () => {
        const dataset = [];
        const categories = this.getCategories();

        for (const category of categories) {
            const allAnalysis = this.getAnalysis();
            const concentrates = [];
            const colors = [];
            for (const analysis of allAnalysis) {
                const concentrate = this.props.isYearly ?
                    this.findByCategoryAndGas(category, analysis) : this.findByCategoryAndYear(category, analysis);
                concentrates.push(concentrate);
                colors.push('#'+Math.random().toString(16).substr(-6));
            }
            dataset.push({
                label: category,
                data: concentrates,
                backgroundColor: colors
            })
        }
        return dataset;
    }

    getChartDataset = () => {
        const dataset = [];
        const allAnalysis = this.getAnalysis();
        for (const analysis of allAnalysis) {
            const categories = this.getCategories();
            const concentrates = [];
            const colors = [];

            for (const category of categories) {
                const concentrate = this.props.isYearly ?
                    this.findByCategoryAndGas(category, analysis) : this.findByCategoryAndYear(category, analysis);
                concentrates.push(concentrate);
                colors.push('#'+Math.random().toString(16).substr(-6));
            }
            dataset.push({
                label: analysis,
                data: concentrates,
                backgroundColor: colors
            })
        }

        return dataset;
    }

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
            <div className="chart">
                <Bar data={{
                            labels: this.getCategories(),
                            datasets: this.getChartDataset()
                        }}
                     width={100}
                     height={50}
                     options={{maintainAspectRation: false}}
                     />

            </div>
        )
    }
}
export default Charts;