from dotenv import load_dotenv
import mysql.connector
import os

# Processa variaveis do dotenv
load_dotenv()
DB_USERNAME = os.getenv('DB_USERNAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_DATABASE = os.getenv('DB_DATABASE')

# Conexao com database
db = mysql.connector.connect(
	host=DB_HOST,
    user=DB_USERNAME,
    password=DB_PASSWORD,
    database=DB_DATABASE
)

paciente_sql = """CREATE TABLE Paciente (
	paciente_id VARCHAR(255) NOT NULL,
	data_nasc DATE,
	idade INT,
	endereco_cep VARCHAR(5),
	endereco_uf VARCHAR(2),
	fk_categoria_id INT,
	UNIQUE(paciente_id),
	PRIMARY KEY (paciente_id),
	FOREIGN KEY (fk_categoria_id) REFERENCES Categoria(categoria_id)
)
"""

fabricante_sql = """CREATE TABLE Fabricante (
	fabricante_id INT AUTO_INCREMENT PRIMARY KEY,
	nome VARCHAR(255),
	CNPJ VARCHAR(255)
)
"""

vacina_sql = """CREATE TABLE Vacina (
	vacina_id INT AUTO_INCREMENT PRIMARY KEY,
	fk_fabricante_id INT,
	nome VARCHAR(255),
	lote VARCHAR(255),
	UNIQUE(vacina_id),
	FOREIGN KEY (fk_fabricante_id) REFERENCES Fabricante(fabricante_id)
)
"""

categoria_sql = """CREATE TABLE Categoria (
	categoria_id INT NOT NULL,
	nome VARCHAR(255),
	UNIQUE(categoria_id),
	UNIQUE(nome),
	PRIMARY KEY (categoria_id)
)
"""

dose_sql = """CREATE TABLE Dose (
	dose_id INT AUTO_INCREMENT PRIMARY KEY,
	descricao_dose VARCHAR(255) NOT NULL,
	num_dose VARCHAR(255),
	fk_vacina_id INT NOT NULL,
	FOREIGN KEY (fk_vacina_id) REFERENCES Vacina(vacina_id)
)
"""

paciente_vacinado_sql = """CREATE TABLE Paciente_Vacinado (
	data_aplicacao DATE,
	fk_vacina_id INT NOT NULL,
	fk_paciente_id VARCHAR(255) NOT NULL,
	PRIMARY KEY (fk_vacina_id, fk_paciente_id),
	FOREIGN KEY (fk_vacina_id) REFERENCES Vacina(vacina_id),
	FOREIGN KEY (fk_paciente_id) REFERENCES Paciente(paciente_id)
)
"""

def cria_tabelas():
	cursor = db.cursor()
	cursor.execute(fabricante_sql)
	print("Tabela Fabricante criada com sucesso!")
	cursor.execute(vacina_sql)
	print("Tabela Vacina criada com sucesso!")
	cursor.execute(categoria_sql)
	print("Tabela Categoria criada com sucesso!")
	cursor.execute(paciente_sql)
	print("Tabela Paciente criada com sucesso!")
	cursor.execute(dose_sql)
	print("Tabela Dose criada com sucesso!")
	cursor.execute(paciente_vacinado_sql)
	print("Tabela Paciente_Vacinado criada com sucesso!")
