import React from "react";

const Dropdown = (props) => {
    return (
            props.isYearly ?
                <select className="form-control w-50" value={props.selected}>
                    {
                        props.items.map(item => {
                            return <option key={item.id} value={item.id}>{item.year}</option>
                        })
                    }
                </select>
                :
                <select className="form-control w-50" value={props.selected}>
                    {
                        props.items.map(item => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })
                    }
                </select>

    )
}

export default Dropdown;