import React from 'react'
import {useTranslation} from "react-i18next";

const ToggleSwitch = (props) => {
    const [t] = useTranslation();
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
                           <span className={t("onoffswitch-inner")}/>
                           <span className="onoffswitch-switch"/>
                       </label>
               </div>
    );
};

export default ToggleSwitch