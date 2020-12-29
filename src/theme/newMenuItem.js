import React from 'react';
import PropTypes from 'prop-types';

const NewMenuItem = (props) => (
    <li>
        <a href="#" className="nav-link">
            <input id={props.id}  type="checkbox" name={props.id} checked={props.checked} onChange={props.onChange} />
            <label htmlFor={props.id}>
                <span className="nav-label p-1 m-0">{props.label}</span>
            </label>
        </a>
    </li>
);

NewMenuItem.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    tree: PropTypes.bool
};

export default NewMenuItem;
