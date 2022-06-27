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

def preenche_dados ():
	for dado in dados['hits']['hits']:
		paciente = {}
		fabricante = {}
		vacina = {}
		categoria = {}
		dose = {}
		paciente_vacina_dose = {}

		# Processa atributos de Paciente
		paciente["paciente_id"] = dado['_source']['paciente_id']
		paciente["data_nasc"] = dado['_source']['paciente_dataNascimento']
		paciente["idade"] = dado['_source']['paciente_idade']
		paciente["endereco_cep"] = dado['_source']['paciente_endereco_cep']
		paciente["endereco_uf"] = dado['_source']['paciente_endereco_uf']

		# Processa atributos de Fabricante
		fabricante["nome"] = dado['_source']['vacina_fabricante_nome']
		fabricante["CNPJ"] = dado['_source']['vacina_fabricante_referencia']

		# Processa atributos de Vacina
		vacina["vacina_id"] = dado['_source']['vacina_codigo']
		vacina["fk_fabricante_id"] = dado['_source']['vacina_fabricante_nome']
		vacina["nome"] = dado['_source']['vacina_nome']
		vacina["lote"] = dado['_source']['vacina_lote']

		# Processa atributos de Categoria
		categoria["vacina_categoria_codigo"] = dado['_source']['vacina_codigo']
		categoria["nome"] = dado['_source']['vacina_categoria_nome']
		categoria["descricao"] = dado['_source']['vacina_grupoAtendimento_nome']

		# Processa atributos de Dose
		dose["dose_id"] = dado['_source']['vacina_numDose']
		dose["descricao_dose"] = dado['_source']['vacina_descricao_dose']

		# Processa atributos de Paciente_Vacina_Dose
		paciente_vacina_dose["data_aplicacao"] = dado['_source']['vacina_dataAplicacao']
		paciente_vacina_dose["fk_dose"] = dado['_source']['vacina_numDose']
		paciente_vacina_dose["fk_vacina_id"] = dado['_source']['vacina_codigo']
		paciente_vacina_dose["fk_paciente_id"] = dado['_source']['paciente_id']

		pacientes_dados["dados"].append(paciente)
		fabricante_dados["dados"].append(fabricante)
		vacina_dados["dados"].append(vacina)
		categoria_dados["dados"].append(categoria)
		dose_dados["dados"].append(dose)
		paciente_vacina_dose_dados["dados"].append(paciente_vacina_dose)

preenche_dados()
f.close()