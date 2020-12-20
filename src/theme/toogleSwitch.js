import React from 'react'

const ToogleSwitch = () => {
    return (
               <div className="onoffswitch">
                   <input type="checkbox"
                          name="onoffswitch"
                          className="onoffswitch-checkbox"
                          id="myonoffswitch"
                   />
                       <label className="onoffswitch-label" htmlFor="myonoffswitch">
                           <span className="onoffswitch-inner"/>
                           <span className="onoffswitch-switch"/>
                       </label>
               </div>
    );
};

export default ToogleSwitch