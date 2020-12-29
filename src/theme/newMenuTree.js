import React from 'react';
import PropTypes from 'prop-types';

const NewMenuTree = (props) => (
    <li className="nav-link">
        <input id={props.id} className="float-left" type="checkbox" name={props.id} checked={props.checked} onChange={props.onChange} />
        <a href="#" className="p-0 my-0 ml-1">
            <label htmlFor={props.id}>
                <span className="nav-label p-1 m-0 ml-1">{props.label}</span>
            </label>
            <span className="fa arrow"/>
        </a>
        {
            props.level === 2 ?
                <ul className="nav nav-second-level collapse">
                    {props.children}
                </ul>
                :
                <ul className="nav nav-third-level collapse">
                    {props.children}
                </ul>
        }

    </li>
);

NewMenuTree.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    children: PropTypes.array.isRequired,
    level: PropTypes.number
};

export default NewMenuTree;
