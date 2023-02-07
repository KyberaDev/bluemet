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
        port: '/var/run/mysqld/mysqld.sock'
    }

}


//"localhost", "u409719253_bluemet_DB", "#e=o3mWR*s3", "u409719253_bluemet"