import React from "react";

const Dropdown = (props) => {
    return (
        <select className="form-control w-100 p-1" onChange={props.onChange}>
            {
                props.items.map(item => {
                    return <option key={item.id} value={item.id} defaultValue={item.checked}>{item.name}</option>
                })
            }
        </select>
    )

}

export default Dropdown;