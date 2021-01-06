import React from 'react'

const ToggleSwitch = (props) => {
    return (
               <div className="onoffswitch">
                   <input type="checkbox"
                          name="onoffswitch"
                          className="onoffswitch-checkbox"
                          id="myonoffswitch"
                          onChange={props.onClick}
                          checked={props.isChecked}
                   />
                       <label className="onoffswitch-label" htmlFor="myonoffswitch">
                           <span className="onoffswitch-inner"/>
                           <span className="onoffswitch-switch"/>
                       </label>
               </div>
    );
};

export default ToggleSwitch