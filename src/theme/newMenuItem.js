import React from 'react';
import PropTypes from 'prop-types';

const NewMenuItem = (props) => {
    return (
    <li className="nav-link">
        <input id={props.id} className="float-left checkbox-round" type="checkbox" name={props.id}
               checked={props.checked} onChange={props.onChange}/>
        <a href="#" className="p-0 ml-1">
            <label htmlFor={props.id}>
                <span className="nav-label p-1 m-0 ml-1">{props.label}</span>
            </label>
        </a>
    </li>)
};

NewMenuItem.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    tree: PropTypes.bool
};

export default NewMenuItem;