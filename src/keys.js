module.exports = {

    databaseDev : {
        host: process.env.DB_HOST || '127.0.0.1',
        user:  process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'u409719253_bluemet_DB',
        port: '3307'
    },

    database : {
        host: 'localhost',
        user:  'u409719253_bluemet',
        password: '#e=o3mWR*s3',
        database: 'u409719253_bluemet_DB',
        port: '3306'
    }

}


//"localhost", "u409719253_bluemet_DB", "#e=o3mWR*s3", "u409719253_bluemet"