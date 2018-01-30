import React from 'react';
import AddStock from './addStock.js';

function Stocks(props) {
    const spanStyle = {
        cursor: "pointer",
        marginLeft: "10px",
        fontSize: "10px"
    };
    
    const stocksList = props.stocks.map((val, i) => {
        return (
            <div key={i} className="stockItem">
                {val}
                <span style={spanStyle} onClick={() => props.removeStock(val)}><b>X</b></span>
            </div>
        );
    });
    
    return (
        <div className="stocks">
            {stocksList}
            <AddStock addStock={props.addStock}/>
        </div>
    );
}

export default Stocks;