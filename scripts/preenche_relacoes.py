from preenche_tabelas import encontra_fabricante_id
from dotenv import load_dotenv
import mysql.connector
import json
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

# Abre json com os dados
f = open('data.json')
dados = json.load(f)

# Inicializa valores a serem inseridos no banco
fabricante_dados = { "dados": [] }
vacina_dados = { "dados": [] }
categoria_dados = { "dados": [] }
dose_dados = { "dados": [] }
paciente_vacinado_dados = { "dados": [] }

# Queries
paciente_vacinado_insere_sql = "INSERT INTO Paciente_Vacinado (data_aplicacao, fk_vacina_id, fk_paciente_id, fk_dose_id) VALUES (%s, %s, %s, %s)"
vacina_seleciona_sql = "SELECT vacina_id FROM Vacina WHERE lote=%s and fk_fabricante_id=%s"
dose_seleciona_sql = "SELECT dose_id FROM Dose WHERE descricao_dose=%s and num_dose=%s"

def encontra_vacina_id (atributos):
	cursor = db.cursor(buffered=True)
	cursor.execute(vacina_seleciona_sql, atributos)
	return cursor.fetchone()[0]

def encontra_dose_id (atributos):
	cursor = db.cursor(buffered=True)
	cursor.execute(dose_seleciona_sql, atributos)
	return cursor.fetchone()[0]

def preenche_paciente_vacinado ():
	cursor = db.cursor()
	for dado in dados['hits']['hits']:
		# Pega as informacoes do paciente vacinado
		data_aplicacao = dado['_source']['vacina_dataAplicacao']

		# Pega as informacoes do paciente
		fk_paciente_id = dado['_source']['paciente_id']

		# Pega as informacoes do fabricante
		nome = dado['_source']['vacina_fabricante_nome']
		CNPJ = dado['_source']['vacina_fabricante_referencia']
		fabricante = (nome, CNPJ)
		fk_fabricante_id = encontra_fabricante_id(fabricante)

		# Pega as informacoes da dose
		descricao_dose = dado['_source']['vacina_descricao_dose']
		num_dose = dado['_source']['vacina_numDose']
		dose = (descricao_dose, num_dose)
		fk_dose_id = encontra_dose_id(dose)

		# Pega as informacoes da vacina
		lote = dado['_source']['vacina_lote']
		vacina = (lote, fk_fabricante_id)
		fk_vacina_id = encontra_vacina_id(vacina)

		paciente_vacinado = (data_aplicacao, fk_vacina_id, fk_paciente_id, fk_dose_id)
		paciente_vacinado_dados["dados"].append(paciente_vacinado)

	# Insere dados de Paciente_Vacinado
	for dado in paciente_vacinado_dados["dados"]:
		cursor.execute(paciente_vacinado_insere_sql, dado)

	db.commit()
	print('Pacientes Vacinados inseridos com sucesso!!')

f.close()