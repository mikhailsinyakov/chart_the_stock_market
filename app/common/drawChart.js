import ChartJS from 'chart.js';
import moment from 'moment';
import shuffle from 'shuffle-array';

function DrawChart() {
    let stockChart = null;
    const colors = ["rgb(0,0,0)", "rgb(255,0,0)", "rgb(0,255,0)",
        "rgb(0,0,255)", "rgb(255,255,0)", "rgb(0,255,255)", "rgb(255,0,255)",
        "rgb(192,192,192)", "rgb(128,128,128)", "rgb(128,0,0)", "rgb(128,128,0)",
        "rgb(0,128,0)", "rgb(128,0,128)", "rgb(0,128,128)", "rgb(0,0,128)"
    ];
    
    this.initDrawing = () => {
        const ctx = document.querySelector("#stockChart").getContext("2d");
        
        const options = {
            title: {
                display: true,
                position: "top",
                text: "STOCKS",
                fontSize: 15
            },
            legend: {
                display: true,
                position: "top",
                labels: {
                    boxWidth: 40,
                    fontColor: "black"
                }
            },
            tooltips: {
                mode: "index",
                intersect: false,
                position: "nearest",
                callbacks: {
                    title: (tooltipItems, data) => {
                        return moment(tooltipItems[0].xLabel).format('D.M.YYYY');
                    }
                }
            },
            hover: {
                mode: "index",
                intersect: false
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            day: 'D.M.YYYY'
                        }
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10
                    }
                }]
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        };
        stockChart = new ChartJS(ctx, {type: "line", options});
    };
    
    this.addDataset = (stockData, period) => {
        stockData = {
            symbol: stockData.symbol,
            data: stockData.data.filter((val, i) => i < period)
        };
        
        if (!stockChart.data.datasets.length) {
            const labels = stockData.data.map(val => val.date)/*moment(val.date).format('D.M.YYYY'))*/.reverse();
            stockChart.data.labels = labels;
        }
        
        const index = stockChart.data.datasets.length;
        
        shuffle(colors);
        const newDataset = {
            data: stockData.data.map(val => +val.closePrice).reverse(),
            label: stockData.symbol,
            borderColor: colors[index],
            fill: false
        };
        
        stockChart.data.datasets.push(newDataset);
        stockChart.update();
        
    };
    
    this.removeDataset = symbol => {
        stockChart.data.datasets = stockChart.data.datasets.filter(val => val.label != symbol);
        stockChart.update();
    };
    
    this.redrawChart = (stocksData, period) => {
        stocksData = stocksData.map(stockData => {
            return {
                symbol: stockData.symbol,
                data: stockData.data.filter((val, i) => i < period)
            };
        });
        const labels = stocksData[0].data.map(val => val.date)/*moment(val.date).format('D.M.YYYY'))*/.reverse();
        
        shuffle(colors);
        const datasets = stocksData.map((stockData, index) => {
            return {
                data: stockData.data.map(val => +val.closePrice).reverse(),
                label: stockData.symbol,
                borderColor: colors[index],
                fill: false
            };
        });
        stockChart.data.labels = labels;
        stockChart.data.datasets = datasets;
        stockChart.update();
    };
    
}
export default DrawChart;