import os
from dotenv import load_dotenv
import mysql.connector

# Processa variaveis do dotenv
load_dotenv()
DB_USERNAME = os.getenv('DB_USERNAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')

db = mysql.connector.connect(
	host=DB_HOST,
    user=DB_USERNAME,
    password=DB_PASSWORD
)

def cria_bd ():
	cursor = db.cursor()
	cursor.execute("CREATE DATABASE datasus")
	print("Database criada com sucesso!!")