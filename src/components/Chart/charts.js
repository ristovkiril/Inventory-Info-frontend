import $ from 'jquery';

import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { saveAs } from "file-saver";
import { withTranslation } from 'react-i18next';


class Charts extends Component {

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
        const categories = this.getCategories();
        for (const analysis of allAnalysis) {

            const colors = [];
            const concentrates = [];

            const color = `#${Math.random().toString(16).substr(-6)}`;
            for (const category of categories) {
                const concentrate = this.props.isYearly ?
                    this.findByCategoryAndGas(category, analysis) : this.findByCategoryAndYear(category, analysis);

                concentrates.push(concentrate);

                colors.push(color);
            }

            dataset.push({
                label: this.props.t(analysis),
                data: concentrates,
                backgroundColor: colors
            })
        }

        return dataset;
    }

    getCategories = (translated = false) => {
        return [...new Set(this.props.selected.map(row => translated ? this.props.t(row.category.name) : row.category.name))]
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

    getMainAnalysis = () => {
        return this.props.isYearly && this.props.selected.length > 0? this.props.selected[0].year.year : this.props.selected[0].gas.name;
    }

    saveAsPng = (e) => {
        e.preventDefault();
        const type = e.target.name;
        if (type.toLowerCase() === "png") {
            $("canvas").get(0).toBlob((blob) => {
                saveAs(blob, this.getMainAnalysis() + ".png");
            })
        }
        else if (type.toLowerCase() === "jpg") {
            $("canvas").get(0).toBlob((blob) => {
                saveAs(blob, this.getMainAnalysis() + ".jpg");
            })
        }
        else if (type.toLowerCase() === "svg") {
            $("canvas").get(0).toBlob((blob) => {
                saveAs(blob, "chart.svg");
            })
        }
        else if (type.toLowerCase() === "pdf") {
            $("canvas").get(0).toBlob((blob) => {
                saveAs(blob, "chart.pdf");
            })
        }
    }

    render() {
        return (
            <div className="chart h-100 " >
                <div className="row p-3 float-right">
                    <button onClick={this.saveAsPng} name="png" className="btn btn-xl btn-primary border-0 m-1"><i className="fa fa-save"></i> {this.props.t("Save as")} PNG</button>
                    <button onClick={this.saveAsPng} name="jpg" className="btn btn-xl btn-primary border-0 m-1"><i className="fa fa-save"></i> {this.props.t("Save as")} JPG</button>
                    {/*<button onClick={this.saveAsPng} name="svg" className="btn btn-xl btn-primary border-0 m-1"><i className="fa fa-save"></i> Save as SVG</button>*/}
                    {/*<button onClick={this.saveAsPng} name="pdf" className="btn btn-xl btn-primary border-0 m-1"><i className="fa fa-save"></i> Save as PDF</button>*/}
                </div>
                <div className="canvas-container mb-5 pb-5 block">
                    <Bar data={{
                        labels: this.getCategories(true),
                        datasets: this.getChartDataset()
                    }}
                         // width={100}
                         // height={50}
                         options={{
                             title: {
                                 display: true,
                                 text: this.props.t('Greenhouse gas emissions') + " " + this.getMainAnalysis(),
                                 fontSize: 24
                             },
                             legend: {
                                 display: true,
                                 position: "bottom"
                             },
                             // responsive: true,
                             barValueSpacing: 2,
                             animationEnabled: true,
                             maintainAspectRatio : false

                         }}
                    />
                </div>

            </div>
        )
    }
}
export default withTranslation()(Charts);