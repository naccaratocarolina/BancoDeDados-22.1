# BancoDeDados-22.1

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
$ python main.py
```