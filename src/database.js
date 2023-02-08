const mysql = require('mysql2');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
    if (err) {
        switch (err.code){
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('DATABASE CONNECTION WAS CLOSED')
                break;
            case 'ER_CON_COUNT_ERROR':
                console.error('DATABASE HAS TO MANY CONNECTIONS')
                break;
            default: 
                console.error('DATABASE CONNECTION WAS REFUSED')
                break
        }
    }
    if(connection) connection.release();
    console.log('DATABASE CONNECTED');
    return
});

pool.query = promisify(pool.query)

module.exports = pool;