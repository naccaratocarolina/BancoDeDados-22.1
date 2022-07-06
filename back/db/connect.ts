require('dotenv').config();
import mysql from 'mysql';

async function connect () {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST as string,
        user: process.env.DB_USERNAME as string,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

    connection.connect(async (err: Error) => {
        if (err) {
            console.log("Falha na conexão do banco de dados! ", err);
            return;
        }
    });

    return connection;
}

export default connect;