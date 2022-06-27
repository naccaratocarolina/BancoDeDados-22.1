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

# Preenche valores a serem inseridos no banco
pacientes_dados = { "dados": [] }
fabricante_dados = { "dados": [] }
vacina_dados = { "dados": [] }
categoria_dados = { "dados": [] }
dose_dados = { "dados": [] }
paciente_vacina_dose_dados = { "dados": [] }

def insere_sem_repeticao (lista):
	dados = []
	for i in lista:
		if i not in dados:
			dados.append(i)
	return dados

def preenche_dados ():
	for dado in dados['hits']['hits']:

		# Processa atributos de Paciente
		paciente_id = dado['_source']['paciente_id']
		data_nasc = dado['_source']['paciente_dataNascimento']
		idade = dado['_source']['paciente_idade']
		endereco_cep = dado['_source']['paciente_endereco_cep']
		endereco_uf = dado['_source']['paciente_endereco_uf']
		paciente = (paciente_id, data_nasc, idade, endereco_cep, endereco_uf)

		# Processa atributos de Fabricante
		nome = dado['_source']['vacina_fabricante_nome']
		CNPJ = dado['_source']['vacina_fabricante_referencia']
		fabricante = (nome, CNPJ)

		# Processa atributos de Vacina
		vacina_id = dado['_source']['vacina_codigo']
		fk_fabricante_nome = dado['_source']['vacina_fabricante_nome']
		nome = dado['_source']['vacina_nome']
		lote = dado['_source']['vacina_lote']
		vacina = (vacina_id, fk_fabricante_nome, nome, lote)

		# Processa atributos de Categoria
		categoria_id = dado['_source']['vacina_categoria_codigo']
		nome = dado['_source']['vacina_categoria_nome']
		descricao = dado['_source']['vacina_grupoAtendimento_nome']
		categoria = (categoria_id, nome, descricao)

		# Processa atributos de Dose
		dose_id = dado['_source']['vacina_numDose']
		descricao_dose = dado['_source']['vacina_descricao_dose']
		dose = (dose_id, descricao_dose)

		# Processa atributos de Paciente_Vacina_Dose
		data_aplicacao = dado['_source']['vacina_dataAplicacao']
		fk_dose = dado['_source']['vacina_numDose']
		fk_vacina_id = dado['_source']['vacina_codigo']
		fk_paciente_id = dado['_source']['paciente_id']
		paciente_vacina_dose = (data_aplicacao, fk_dose, fk_vacina_id, fk_paciente_id)

		pacientes_dados["dados"].append(paciente)
		fabricante_dados["dados"].append(fabricante)
		vacina_dados["dados"].append(vacina)
		categoria_dados["dados"].append(categoria)
		dose_dados["dados"].append(dose)
		paciente_vacina_dose_dados["dados"].append(paciente_vacina_dose)

		pacientes_dados["dados"] = insere_sem_repeticao(pacientes_dados["dados"])
		fabricante_dados["dados"] = insere_sem_repeticao(fabricante_dados["dados"])
		vacina_dados["dados"] = insere_sem_repeticao(vacina_dados["dados"])
		categoria_dados["dados"] = insere_sem_repeticao(categoria_dados["dados"])
		dose_dados["dados"] = insere_sem_repeticao(dose_dados["dados"])
		paciente_vacina_dose_dados["dados"] = insere_sem_repeticao(paciente_vacina_dose_dados["dados"])

paciente_sql = "INSERT INTO Paciente (paciente_id, data_nasc, idade, endereco_cep, endereco_uf) VALUES (%s, %s, %s, %s, %s)"
fabricante_sql = "INSERT INTO Fabricante (nome, CNPJ) VALUES (%s, %s)"
vacina_sql = "INSERT INTO Vacina (vacina_id, fk_fabricante_nome, nome, lote) VALUES (%s, %s)"
categoria_sql = "INSERT INTO Categoria (categoria_id, nome, descricao) VALUES (%s, %s, %s)"
dose_sql = "INSERT INTO Dose (dose_id, descricao_dose) VALUES (%s, %s)"
paciente_vacina_dose_sql = "INSERT INTO Paciente_Vacina_Dose (data_aplicacao, fk_dose, fk_vacina_id, fk_paciente_id) VALUES (%s, %s)"

def insere_muitos ():
	preenche_dados()
	cursor = db.cursor()

	# Insere dados de Paciente
	for dado in pacientes_dados["dados"]:
		cursor.execute(paciente_sql, dado)

	# Insere dados de Fabricante
	for dado in fabricante_dados["dados"]:
		cursor.execute(fabricante_sql, dado)

	# Insere dados de Vacina
	for dado in vacina_dados["dados"]:
		cursor.execute(vacina_sql, dado)

	# Insere dados de Categoria
	for dado in categoria_dados["dados"]:
		cursor.execute(categoria_sql, dado)

	# Insere dados de Dose
	for dado in dose_dados["dados"]:
		cursor.execute(dose_sql, dado)

	# Insere dados de Paciente_Vacina_Dose
	for dado in paciente_vacina_dose_dados["dados"]:
		cursor.execute(paciente_vacina_dose_sql, dado)

	db.commit()
	print('Valores inseridos com sucesso!!')

preenche_dados()
print(categoria_dados["dados"])

f.close()