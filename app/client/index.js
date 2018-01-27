import React from 'react';
import ReactDOM from 'react-dom';
import StocksController from '../controllers/stocksController.client.js';
import Header from '../components/Header.js';
import Chart from '../components/Chart.js';
import Stocks from '../components/Stocks.js';
import Footer from '../components/Footer.js';

const stocksController = new StocksController();

const app = document.querySelector("#app");

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: []
        };
        
        this.updateStocks = this.updateStocks.bind(this);
    }
    
    updateStocks(stocks) {
        this.setState({stocks});
    }
    
    componentDidMount() {
        stocksController.getStocks(this.updateStocks);
    }
    
    componentDidUpdate() {
        //console.log(this.state);
    }
    
    render() {
        return (
            <div>
                <Header />
                <Chart stocks={this.state.stocks} />
                <button onClick={() => stocksController.getStocks(this.updateStocks)}>Update stocks</button>
                <Stocks stocks={this.state.stocks} />
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App/>, app);

