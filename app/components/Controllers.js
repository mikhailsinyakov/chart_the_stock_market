import React from 'react';
import ControllerButton from './ControllerButton.js';

function Controllers(props) {
    
    return (
        <nav className="controllers">
            <ul className="pagination pagination-sm">
                <ControllerButton currPeriod={props.period} newPeriod={90} lang={props.lang}
                                  changePeriod={props.changePeriod} />
                <ControllerButton currPeriod={props.period} newPeriod={30} lang={props.lang}
                                  changePeriod={props.changePeriod}/>
                <ControllerButton currPeriod={props.period} newPeriod={14} lang={props.lang}
                                  changePeriod={props.changePeriod} />
            </ul>
            
        </nav>
    );
}

export default Controllers;