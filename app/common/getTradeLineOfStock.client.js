import ajaxFunctions from '../common/ajax-functions.js';

function getTradeLineOfStock(symbol) {
    return new Promise((resolve, reject) => {
        const url = `/api/getTradeLineOfStock/${symbol}`;
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", url, (status, response) => {
            if (status != 200) reject(`Error ${status}`);
            else {
                const stockInfo = {
                    symbol,
                    tradeLines: JSON.parse(response)
                };
                resolve(stockInfo);
            }
        }));
    });
}

export default getTradeLineOfStock;