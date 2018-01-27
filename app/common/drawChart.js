import ChartJS from 'chart.js';
import moment from 'moment';

function drawChart(stocksHistory) {
    const datasets = stocksHistory.map((val, i) => {
        return {
            data: val.history.map(val => val.closePrice).reverse(),
            label: val.symbol,
            borderColor: `rgb(${100 + i * 30}, ${50 + i * 60}, ${150 + i * 50})`,
            fill: false
        };
    });
    const labels = stocksHistory[0].history.map(val => moment(val.date).format('D.M.YYYY')).reverse();
    
    const ctx = document.querySelector("#stockChart").getContext("2d");
    
    const myChart = new ChartJS(ctx, {
        type: "line",
        data: {
            datasets,
            labels
        },
        options: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    boxWidth: 40,
                    fontColor: "black"
                }
            }
        }
    });
}
export default drawChart;