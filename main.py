import mysql.connector

# Cria a database
from cria_bd import cria_bd
cria_bd()

# Cria as tabelas
from cria_tabelas import cria_tabelas
cria_tabelas()

# Preenche dados
from preenche_tabelas import insere_muitos
insere_muitos()