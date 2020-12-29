import React from "react";

const Dropdown = (props) => {
    return (
        <select className="form-control w-50" onChange={props.onChange}>
            {
                props.items.map(item => {
                    return <option key={item.id} value={item.id} selected={item.checked}>{item.name}</option>
                })
            }
        </select>
    )

}

export default Dropdown;