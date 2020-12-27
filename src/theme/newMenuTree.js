import React from 'react';
import PropTypes from 'prop-types';

const NewMenuTree = (props) => (
    <li>
        <a href="#">
        <input id={props.id} type="checkbox" name={props.id} checked={props.checked} />
        <label htmlFor={props.id}>
            <span className="nav-label">{props.label}</span>
        </label>
        <span className="fa arrow"/>
        </a>
        {
            props.level === 2 ?
                <ul className="nav nav-second-level collapse">
                    {props.children}
                    {console.log(props.children + " aaaa")}
                </ul>
            :
                <ul className="nav nav-third-level collapse">
                    {props.children}
                    {console.log(props.children + " aaaa")}
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
