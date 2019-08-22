import React from 'react';

function ControllerButton(props) {
    
    function periodToString(period) {
        if (props.lang === 'ru') {
            if (period == 90) return "3 месяца";
            if (period == 30) return "1 месяц";
            if (period == 14) return "2 недели";
        } else {
            if (period == 90) return "3 months";
            if (period == 30) return "1 month";
            if (period == 14) return "2 weeks";
        }
        
    }
    
    if (props.currPeriod == props.newPeriod) {
        return (
            <li className="page-item active">
                <a className="page-link" href="#" onClick={e => e.preventDefault}>
                    {periodToString(props.newPeriod)}
                </a>
            </li>
        );
    }
    
    return (
        <li className="page-item">
            <a className="page-link" href="#" onClick={e => {
                        e.preventDefault();
                        props.changePeriod(props.newPeriod)}
                    }>
                {periodToString(props.newPeriod)}
            </a>
        </li>
    );
}

export default ControllerButton;