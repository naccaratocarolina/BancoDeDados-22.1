import mysql.connector

# Cria a database
from cria_bd import cria_bd
cria_bd()

# Cria as tabelas
from cria_tabelas import cria_tabelas
cria_tabelas()

# Preenche dados
from preenche_tabelas import preenche_categoria_fabricante, preenche_paciente, preenche_vacina, preenche_dose
preenche_categoria_fabricante()
preenche_paciente()
preenche_vacina()
preenche_dose()

from preenche_relacoes import preenche_paciente_vacinado
preenche_paciente_vacinado()