import React from 'react';
import ControllerButton from './ControllerButton.js';

function Controllers(props) {
    
    
    return (
        <div className="controllers">
            <ControllerButton currPeriod={props.period} newPeriod={90}
                              changePeriod={props.changePeriod} />
            <ControllerButton currPeriod={props.period} newPeriod={30} 
                              changePeriod={props.changePeriod}/>
            <ControllerButton currPeriod={props.period} newPeriod={7}
                              changePeriod={props.changePeriod} />
        </div>
    );
}

export default Controllers;