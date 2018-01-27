import React from 'react';
import drawChart from '../common/drawChart.js';
import getTradeLineOfStock from '../common/getTradeLineOfStock.client.js';
import Controllers from './Controllers.js';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocksTradeLines: [],
            period: 90
        };
        
        this.changePeriod = this.changePeriod.bind(this);
        this.fillInitStocksTradeLines = this.fillInitStocksTradeLines.bind(this);
        this.addStockTradeLine = this.addStockTradeLine.bind(this);
        this.removeStockTradeLine = this.removeStockTradeLine.bind(this);
        //this.drawCurrentStocks = this.drawCurrentStocks.bind(this);
    }
    
    fillInitStocksTradeLines() {
        const stocks = this.props.stocks;
        if (!stocks.length) return;
        const stocksPromises = stocks.map(val => getTradeLineOfStock(val));
        
        Promise.all(stocksPromises)
               .then(stocksTradeLines => this.setState({stocksTradeLines}))
               .catch(error => console.log(error));
        
    }
    
    addStockTradeLine() {
        const stocks = this.props.stocks;
        const prevStocks = this.state.stocksTradeLines.map(val => val.symbol);
        const newStock = stocks.filter(val1 => {
            const matched = prevStocks.filter(val2 => val1 == val2);
            if (matched.length) return false;
            return true;
        })[0];
        
        getTradeLineOfStock(newStock)
            .then(stockInfo => {
                const stocksTradeLines = this.state.stocksTradeLines;
                stocksTradeLines.push(stockInfo);
                this.setState({stocksTradeLines});
            })
            .catch(error => console.log(error));
        
        
    }
    
    removeStockTradeLine() {
        const stocks = this.props.stocks;
        const prevStocks = this.state.stocksTradeLines.map(val => val.symbol);
        const removedStock = prevStocks.filter(val1 => {
            const matched = stocks.filter(val2 => val1 == val2);
            if (matched.length) return false;
            return true;
        })[0];
        const stocksTradeLines = this.state.stocksTradeLines.filter(val => val.symbol != removedStock);
        this.setState({stocksTradeLines});
    }
    
    changePeriod(period) {
        this.setState({period});
    }
    
    componentDidMount() {
        //console.log("mount", this.props.stocks)
    }
    
    componentDidUpdate(prevProps, prevState) {
        console.log("stocks", this.props.stocks);
        console.log("stocksTradeLines", this.state.stocksTradeLines);
        if (this.state.updates > 9) return;
        
        // Check workable
        if (!prevProps.stocks.length) {
            if (this.props.stocks.length == 1) {
                return this.addStockTradeLine();
            }
            return this.fillInitStocksTradeLines();
        }
        
        if (prevProps.stocks.length < this.props.stocks.length) {
            return this.addStockTradeLine();
        }
        
        if (prevProps.stocks.length > this.props.stocks.length) {
            return this.removeStockTradeLine();
        }
        
    }
    
    
    render() {
        return (
            <div className="chart">
                <Controllers period={this.state.period} 
                             changePeriod={this.changePeriod} />
                <canvas id="stockChart" width="1000" height="400"></canvas>
            </div>
        );
    }
}

export default Chart;