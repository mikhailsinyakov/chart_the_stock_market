import ajaxFunctions from '../common/ajax-functions.js';

function getStockData(symbol) {
    const url = `/api/getStockData/${symbol}`;
    return new Promise((resolve, reject) => {
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", url, (status, response) => {
            let error;
            if (status != 200) error = `Error ${status}`;
            if (!JSON.parse(response).length) error = 'not found';
            if (error) return reject(error);
            resolve({
                symbol,
                data: JSON.parse(response)
            });
            
        }));
    });
}

export default getStockData;