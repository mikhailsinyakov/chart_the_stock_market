'use strict';

module.exports = server => {
    const io = require('socket.io').listen(server);
    let users = [];
    
    io.on('connection', socket => {
        users.push(socket);
        
        socket.on('changedStocks', () => {
            users.forEach(socket => socket.emit('updateStocks', true));
        });
        
        socket.on('disconnect', () => {
            users = users.filter(val => val != socket);
        });
    });
    
};