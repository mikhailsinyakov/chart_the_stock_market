import ajaxFunctions from '../common/ajax-functions.js';

function StocksController() {
    
    this.getStocks = callback => {
        const url = "/api/getStocks";
        ajaxFunctions.ready(ajaxFunctions.ajaxRequest("GET", url, (status, response) => {
            if (status != 200) return console.log(status);
            response = JSON.parse(response).map(val => val.name);
            return callback(response);
        }));
    };
    
}

export default StocksController;