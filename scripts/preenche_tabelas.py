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
pacientes_dados = { "dados": [] }
fabricante_dados = { "dados": [] }
vacina_dados = { "dados": [] }
categoria_dados = { "dados": [] }
dose_dados = { "dados": [] }
paciente_vacina_dose_dados = { "dados": [] }

# Queries
paciente_insere_sql = "INSERT INTO Paciente (paciente_id, data_nasc, idade, endereco_cep, endereco_uf, fk_categoria_id) VALUES (%s, %s, %s, %s, %s, %s)"
fabricante_insere_sql = "INSERT INTO Fabricante (nome, CNPJ, logo) VALUES (%s, %s, %s)"
vacina_insere_sql = "INSERT INTO Vacina (fk_fabricante_id, nome, lote) VALUES (%s, %s, %s)"
categoria_insere_sql = "INSERT INTO Categoria (categoria_id, nome, descricao) VALUES (%s, %s, %s)"
fabricante_seleciona_sql = "SELECT fabricante_id FROM Fabricante WHERE nome=%s and CNPJ=%s"

def converteParaFormatoBinario (arquivo):
	with open(arquivo, 'rb') as file:
		dadoBinario = file.read()
	return dadoBinario

def preencheLogoConformeFab (nome):
	dirlist = os.listdir("./imagens/fabricantes") 
	for i in dirlist:
		arquivo = os.path.abspath(os.path.join("./imagens/fabricantes", i))
		if nome in arquivo:
			return converteParaFormatoBinario(arquivo)

def remove_repeticao (lista):
	dados = []
	for i in lista:
		if i not in dados:
			dados.append(i)
	return dados

def preenche_dados_instancias ():
	for dado in dados['hits']['hits']:

		# Processa atributos de Fabricante
		nome = dado['_source']['vacina_fabricante_nome']
		CNPJ = dado['_source']['vacina_fabricante_referencia']
		logo = preencheLogoConformeFab(nome)
		fabricante = (nome, CNPJ, logo)

		# Processa atributos de Dose
		descricao_dose = dado['_source']['vacina_descricao_dose']
		num_dose = dado['_source']['vacina_numDose']
		dose = (descricao_dose, num_dose)

		fabricante_dados["dados"].append(fabricante)
		dose_dados["dados"].append(dose)

		fabricante_dados["dados"] = remove_repeticao(fabricante_dados["dados"])

def preenche_categoria_fabricante ():
	preenche_dados_instancias()
	cursor = db.cursor()

	# Insere dados de Fabricante
	for dado in fabricante_dados["dados"]:
		cursor.execute(fabricante_insere_sql, dado)

	# Insere dados de Categoria
	categoria_dados["dados"] = [
		(1, "Comorbidades", 
			"Pessoas que possuem comorbidades incluídas como prioritárias para vacinação"),
		(2, "Faixa Etária", 
			"Pessoas que estão de acordo com o calendário por idade"),
		(3, "Pessoas de 60 anos ou mais institucionalizadas", 
			"Pessoas que possuem mais de 60 anos e estao institucionalizadas"),
		(4, "Forças Armadas (membros ativos)", 
			"Marinha do Brasil, Exército Brasileiro e Força Aérea Brasileira"),
		(5, "Forças de Segurança e Salvamento", 
			"Bombeiro Civil, Militar, Guarda Municipal, Policial Rodoviário Federal, Civil, Federal e Militar"),
		(6, "Povos e Comunidades Tradicionais", 
			"Povos e Comunidades Tradicionais Ribeirinhas e Quilombolas"),
		(7, "Povos Indígenas", 
			"Povos Indígenas vivendo em Terras Indígenas"),
		(8, "Trabalhadores da Educação", 
			"Trabalhadores de Educação do Ensino Básico e Superior"),
		(9, "Trabalhadores de Saúde", 
			"Médico(a), Médico(a) Veterinário, Enfermeiro(a), Nutricionista, Dentista, Psicólogo, Outros"),
		(10, "Trabalhadores de Transporte", 
			"Caminhoneiros, Trabalhadores de Transporte Coletivo Rodoviário de Passageiros, Outros"),
		(11, "Pessoas com Deficiência", 
			"Pessoas com Deficiências Permanente Grave"),
		(12, "Pessoas em Situação de Rua", "Pessoas em Situação de Rua"),
		(15, "População Privada de Liberdade", "População Privada de Liberdade"),
		(16, "Trabalhadores Industriais", "Trabalhadores Industriais"),
		(21, "Gestantes", "Gestantes"),
		(25, "Puérperas", "Puérperas"),
		(94, "Trabalhadores de Limpeza Urbana", "Trabalhadores de limpeza urbana e manejo de resíduos sólidos"),
		(114, "Outros", "Outros"),
	]
	for dado in categoria_dados["dados"]:
		cursor.execute(categoria_insere_sql, dado)

	db.commit()
	print('Fabricantes inseridos com sucesso!!')
	print('Categorias inseridas com sucesso!!')

def encontra_fabricante_id (atributos):
	cursor = db.cursor()
	cursor.execute(fabricante_seleciona_sql, atributos)
	return cursor.fetchone()[0]

def preenche_paciente ():
	cursor = db.cursor()
	i = 0
	for dado in dados['hits']['hits']:
		# Pega as informacoes do paciente
		paciente_id = dado['_source']['paciente_id']
		data_nasc = dado['_source']['paciente_dataNascimento']
		idade = dado['_source']['paciente_idade']
		endereco_cep = dado['_source']['paciente_endereco_cep']
		endereco_uf = dado['_source']['paciente_endereco_uf']

		# Pega as informacoes da categoria
		categoria_id = dado['_source']['vacina_categoria_codigo']

		paciente = (paciente_id, data_nasc, idade, endereco_cep, endereco_uf, categoria_id)
		pacientes_dados["dados"].append(paciente)
		pacientes_dados["dados"] = remove_repeticao(pacientes_dados["dados"])

	# Insere dados de Paciente
	for dado in pacientes_dados["dados"]:
		cursor.execute(paciente_insere_sql, dado)

	db.commit()
	print('Pacientes inseridos com sucesso!!')

def preenche_vacina ():
	cursor = db.cursor()
	for dado in dados['hits']['hits']:
		# Pega as informacoes da vacina
		nome = dado['_source']['vacina_nome']
		lote = dado['_source']['vacina_lote']

		# Pega as informacoes do fabricante
		nome = dado['_source']['vacina_fabricante_nome']
		CNPJ = dado['_source']['vacina_fabricante_referencia']
		fabricante = (nome, CNPJ)

		fk_fabricante_id = encontra_fabricante_id(fabricante)
		vacina = (fk_fabricante_id, nome, lote)
		vacina_dados["dados"].append(vacina)
		vacina_dados["dados"] = remove_repeticao(vacina_dados["dados"])

	# Insere dados de Vacina
	for dado in vacina_dados["dados"]:
		cursor.execute(vacina_insere_sql, dado)

	db.commit()
	print('Vacinas inseridas com sucesso!!')

f.close()