module.exports = {

    databaseDev : {
        host: process.env.DB_HOST || '127.0.0.1',
        user:  process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'u409719253_bluemet_DB',
        port: '3306'
    },

    database : {
        host: '191.101.71.140',
        user:  'u409719253_bluemet',
        password: '#e=o3mWR*s3',
        database: 'u409719253_bluemet_DB',
    }

}


//"localhost", "u409719253_bluemet_DB", "#e=o3mWR*s3", "u409719253_bluemet"
//ALTER USER 'u409719253_bluemet'@'191.101.71.140' IDENTIFIED WITH mysql_native_password BY '#e=o3mWR*s3';
//ALTER USER 'root'@'191.101.71.140' IDENTIFIED WITH mysql_native_password BY 'root';