import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewMenuItem = (props) => (
    <li>
        <input id={props.id} type="checkbox" name={props.id} checked={props.checked} />
        <label htmlFor={props.id}>
            { props.tree ? props.label : <span className="nav-label">{props.label}</span> }
        </label>
    </li>
);

NewMenuItem.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    tree: PropTypes.bool
};

export default NewMenuItem;
