require('dotenv').config();
import mysql from 'mysql';

async function connect () {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST as string,
        user: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
    console.log("Connected!");

    return connection;
}

export default connect;