import React from 'react'

const ToogleSwitch = (props) => {
    return (
               <div className="onoffswitch">
                   <input type="checkbox"
                          name="onoffswitch"
                          className="onoffswitch-checkbox"
                          id="myonoffswitch"
                          onClick={props.onClick}
                          checked={props.isChecked}
                   />
                       <label className="onoffswitch-label" htmlFor="myonoffswitch">
                           <span className="onoffswitch-inner"/>
                           <span className="onoffswitch-switch"/>
                       </label>
               </div>
    );
};

export default ToogleSwitch