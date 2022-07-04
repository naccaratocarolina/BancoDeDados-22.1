require('dotenv').config();
import mysql from 'mysql';

const connection = mysql.createPool({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export default connection;