import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import StocksController from '../controllers/stocksController.client.js';
import getStockData from '../common/getStockData.client.js';
import DrawChart from '../common/drawChart.js';
import Header from '../components/Header.js';
import Chart from '../components/Chart.js';
import Stocks from '../components/Stocks.js';
import Footer from '../components/Footer.js';

const stocksController = new StocksController();
const drawChart = new DrawChart();

let socket;

const app = document.querySelector("#app");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            period: 90
        };
        
        this.stocksData = [];
        this.stockDataBuffer = {};
        
        this.updateStocks = this.updateStocks.bind(this);
        this.updateStocksDataAndChart = this.updateStocksDataAndChart.bind(this);
        this.addStock = this.addStock.bind(this);
        this.removeStock = this.removeStock.bind(this);
        this.changePeriod = this.changePeriod.bind(this);
        this.getStocksChanges = this.getStocksChanges.bind(this);
        this.isStocksUpdated = this.isStocksUpdated.bind(this);
    }
    
    updateStocks() {
        stocksController.getStocks().then(stocks => this.setState({stocks}))
                                  .catch(err => console.log(err));
    }
    
    addStock(symbol) {
        const isAlreadyExist = !!this.state.stocks.filter(val => val == symbol).length;
        const greaterThanMaxLength = this.state.stocks.length > 14;
        if (isAlreadyExist || greaterThanMaxLength) return;
        getStockData(symbol).then(stockData => {
                                this.stockDataBuffer = stockData;
                                stocksController.addStock(symbol);
                            })
                            .then(() => socket.emit('changedStocks', true))
                            .catch(err => console.log(err));
    }
    
    removeStock(symbol) {
        stocksController.removeStock(symbol).then(() => socket.emit('changedStocks', true))
                                            .catch(err => console.log(err));
    }
    
    changePeriod(period) {
        this.setState({period});
    }
    
    isStocksUpdated(prevStocks, currStocks) {
        if (prevStocks.length != currStocks.length) return true;
        const matchedStocks = prevStocks.filter(val1 => {
                return currStocks.filter(val2 => val1 == val2).length;
            });
        if (matchedStocks.length != prevStocks.length) return true;
        return false;
    }
    
    updateStocksDataAndChart(prevStocks, currStocks) {
        const {added: addedStocks, removed: removedStocks} = this.getStocksChanges(prevStocks, currStocks);
            
            addedStocks.forEach(symbol => {
                if (this.stockDataBuffer.symbol == symbol) {
                    const stockData = this.stockDataBuffer;
                    this.stocksData.push(stockData);
                    drawChart.addDataset(stockData, this.state.period);
                    this.stockDataBuffer = {};
                }
                else {
                    getStockData(symbol).then(stockData => {
                        this.stocksData.push(stockData);
                        drawChart.addDataset(stockData, this.state.period);
                    }).catch(err => console.log(err));
                }
            });
            
            removedStocks.forEach(symbol => {
                this.stocksData = this.stocksData.filter(val => val.symbol != symbol);
                drawChart.removeDataset(symbol);
            });
    }
    
    getStocksChanges(prevStocks, currStocks) {
        let added = currStocks.filter(val1 => {
                return !prevStocks.filter(val2 => val1 == val2).length;
            });
        
        let removed = prevStocks.filter(val1 => {
                return !currStocks.filter(val2 => val1 == val2).length;
            });
        
        return {added, removed};
        
    }
    
    componentDidMount() {
        socket = io.connect();
        socket.on('updateStocks', this.updateStocks);
        this.updateStocks();
        drawChart.initDrawing();
    }
    
    componentDidUpdate(prevProps, prevState) {
        const prevStocks = prevState.stocks;
        const currStocks = this.state.stocks;
        const isStocksUpdated = this.isStocksUpdated(prevStocks, currStocks);
        const isPeriodUpdated = prevState.period != this.state.period;
        if (isStocksUpdated) {
            this.updateStocksDataAndChart(prevStocks, currStocks);
        }
        
        if (isPeriodUpdated) {
            drawChart.redrawChart(this.stocksData, this.state.period);
        }
    }
    
    render() {
        return (
            <div>
                <Header />
                <Chart stocks={this.state.stocks} period={this.state.period} 
                        changePeriod={this.changePeriod}/>
                <Stocks stocks={this.state.stocks} addStock={this.addStock}
                        removeStock={this.removeStock}/>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);

