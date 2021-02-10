import React, {useState} from 'react';
import PropTypes from 'prop-types';

const NewMenuTree = (props) => {
    const [show, setShow] = useState(false);

    return (
    <li className="nav-link pr-1">
        <input id={props.id}
               className={"float-left checkbox-round" }
               type="checkbox"
               name={props.id}
               checked={props.checked}
               onChange={props.onChange} />

        <a href="#"
           aria-expanded={show}
           className="p-0 my-0 ml-1">
            <label htmlFor={props.id} className={"nav-label has-arrow"}>
                <span className=" p-1 m-0 ml-1">{props.label}</span>
            </label>
            {show ?
                <span  onClick={event => {
                    // event.preventDefault();
                    setShow((prevState => !prevState))
                }} className="float-right fa fa-angle-down"/>
                : (
                    <span  onClick={event => {
                        // event.preventDefault();
                        setShow((prevState => !prevState))
                    }} className="float-right fa fa-angle-left"/>
                )}
        </a>
        {
            show ?
                <ul className={"nav collapse in"}>
                    {props.children}
                </ul> : ""
        }
        {/*{*/}
        {/*    props.level === 2 ?*/}
        {/*        <ul className="nav nav-second-level collapse">*/}
        {/*            {props.children}*/}
        {/*        </ul>*/}
        {/*        :*/}
        {/*        <ul className="nav nav-third-level collapse">*/}
        {/*            {props.children}*/}
        {/*        </ul>*/}
        {/*}*/}

    </li>)
}

NewMenuTree.propTypes = {
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    children: PropTypes.array.isRequired,
    level: PropTypes.number
};

export default NewMenuTree;
