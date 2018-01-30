import React from 'react';

function ControllerButton(props) {
    
    function periodToString(period) {
        if (period == 90) return "3 months";
        if (period == 30) return "1 month";
        if (period == 14) return "2 weeks";
    }
    
    if (props.currPeriod == props.newPeriod) {
        return (
            <button><b>{periodToString(props.newPeriod)}</b></button>
        );
    }
    
    return (
        <button onClick={() => props.changePeriod(props.newPeriod)}>
            {periodToString(props.newPeriod)}
        </button>
    );
}

export default ControllerButton;