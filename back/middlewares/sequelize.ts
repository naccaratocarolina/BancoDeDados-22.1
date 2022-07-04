require('dotenv').config();
import { Sequelize } from 'sequelize-typescript';
import sqlite3 from 'sqlite3';
import path from 'path';

const sequelize = new Sequelize(
	process.env.DB_DATABASE as string,
	process.env.DB_USERNAME as string,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		dialect: 'sqlite',
		dialectModule: sqlite3,
		models: [path.join(__dirname, '../models')]
	},
);

export default sequelize;