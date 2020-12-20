import React, {Component} from 'react';

export default class Table extends Component {

    render() {
        return (
            <table className="table">
                <thead className="">
                <tr>
                    <th>Категории</th>
                    <th>2011</th>
                    <th>2012</th>
                    <th>2013</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th>Вкупни емисии и отстранувања</th>
                    <td>1.21</td>
                    <td>1.30</td>
                    <td>1.34</td>
                </tr>
                <tr>
                    <th>1 - Енергија</th>
                    <td>1.21</td>
                    <td>1.30</td>
                    <td>1.34</td>
                </tr>
                <tr>
                    <th>2 - Индустриски процеси и користење на производи</th>
                    <td>1.21</td>
                    <td>1.30</td>
                    <td>1.34</td>
                </tr>
                </tbody>
            </table>
        )
    }
}