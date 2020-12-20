import React, {Component} from "react";

export default class Dropdown extends Component {

    render() {
        return(
            <select className="form-control w-50">
                <option selected>Group 1</option>
                <option>Group 2</option>
                <option>Group 3</option>
                <option>Group 4</option>
            </select>
        )
    }
}