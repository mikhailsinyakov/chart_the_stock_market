import React from 'react';
import AddStock from './addStock.js';

function Stocks(props) {
    
    const stocksList = props.stocks.map((val, i) => {
        return (
            <div key={i} className="stock-item bg-secondary">
                <h4 className="text-warning">{val.symbol}</h4>
                <p className="text-light">{val.name}</p>
                <p className="text-light">{val.sector}</p>
                <i className="fa fa-times" onClick={() => props.removeStock(val.symbol)}></i>
            </div>
        );
    });
    
    return (
        <div className="stocks">
            {stocksList}
            <AddStock addStock={props.addStock} addingError={props.addingError}/>
        </div>
    );
}

export default Stocks;