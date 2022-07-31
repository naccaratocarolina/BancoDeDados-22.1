# BancoDeDados-22.1
Repositorio destinado ao trabalho final da disciplina de Banco de Dados 2022.1

## Tabela de Conteúdo
1. [Alunos](#alunos)
2. [Pre-requisitos](#pre-requisitos)
3. [Setup](#setup)
4. [Setup Back](#back)
5. [Setup Front](#front)

## Alunos
- Carolina Nacaratto
- Domenica Cioci
- Gabriel Raposo
- Igor Murras
- Tales Moreira

## Pre-requisitos
- Instalar bibliotecas<br>
``` bash
$ pip install mysql-connector-python
```
``` bash
$ pip install python-dotenv
```
- Configurar senha do mysql<br>
``` bash
$ mysql -u
MariaDB [(none)]> use mysql;
MariaDB [(none)]> set password for 'root'@'localhost' = password('YOUR_ROOT_PASSWORD_HERE');
MariaDB [(none)]> flush privileges;
MariaDB [(none)]> quit
$ mysql -u root -p
```

## Setup
- Repositório Git<br>
  *Clone o repositorio*
``` bash
$ git clone https://github.com/naccaratocarolina/BancoDeDados-22.1.git
```

## Back
- Entre na pasta do back
``` bash
$ cd back/
```

- Crie o arquivo ```.env```<br>
  *Copie o conteudo do arquivo de exemplo ```.env.example```*
``` bash
$ cp .env.example .env
```

- Configure o arquivo ```.env```<br>
  *Adicione as informações necessárias para a conexao com o banco de dados*
``` text
# DATABASE
DB_USERNAME=<seu user>
DB_PASSWORD=<sua senha>
```

- Execute o arquivo principal ```main.py```<br>
``` bash
$ python scripts/main.py
```

- Instale as bibliotecas
``` bash
$ npm install
```

- Sirva o back
``` bash
$ ts-node app.ts
```


## Front
- Entre na pasta do front
``` bash
$ cd front/
```

- Crie o arquivo ```.env```<br>
  *Copie o conteudo do arquivo de exemplo ```.env.example```*
``` bash
$ cp .env.example .env
```

- Instale as bibliotecas
``` bash
$ npm install
```

- Sirva o front
``` bash
$ npm start
```