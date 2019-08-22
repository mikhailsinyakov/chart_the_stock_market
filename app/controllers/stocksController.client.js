import ajaxFunctions from '../common/ajax-functions.js';

function StocksController() {
    
    this.getStocks = () => {
        const url = "/api/getStocks";
        return new Promise((resolve, reject) => {
            ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", url, (status, response) => {
                if (status != 200) return reject(status);
                return resolve(JSON.parse(response));
            }));
        });
    };
    
    this.addStock = symbol => {
        const url = `/api/addStock/${symbol}`;
        return new Promise((resolve, reject) => {
            ajaxFunctions.ready(ajaxFunctions.ajaxRequest("POST", url, status => {
                if (status != 200) return reject(status);
                return resolve(status);
            }));
        });
    };
    
    this.removeStock = symbol => {
        const url = `/api/removeStock/${symbol}`;
        return new Promise((resolve, reject) => {
            ajaxFunctions.ready(ajaxFunctions.ajaxRequest("DELETE", url, status => {
                if (status != 200) return reject(status);
                return resolve(status);
            }));
        });
    };
    
}

export default StocksController;