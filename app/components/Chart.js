import React from 'react';
import Controllers from './Controllers.js';



function Chart(props) {
    return (
        <div className="chart">
            <Controllers period={props.period} 
                         changePeriod={props.changePeriod}/>
            <canvas id="stockChart" width="1000" height="300"></canvas>
        </div>
    );
}

export default Chart;