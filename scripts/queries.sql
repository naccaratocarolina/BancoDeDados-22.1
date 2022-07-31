-- consulta envolvendo apenas as operações de seleção e projeção
SELECT * FROM Paciente WHERE paciente_id = ?

-- 2 consultas envolvendo a junção de apenas duas relações, sendo que uma deve conter junção externa

SELECT DISTINCT vacina_id, fk_fabricante_id, lote, Fabricante.nome, CNPJ FROM Vacina INNER JOIN Fabricante ON Vacina.fk_fabricante_id = Fabricante.fabricante_id GROUP BY lote;

SELECT paciente_id, nome FROM Paciente LEFT OUTER JOIN Categoria ON Paciente.fk_categoria_id = Categoria.categoria_id;

-- 2 consultas envolvendo a junção de três ou mais relações
SELECT paciente_id, data_aplicacao, dose_id, Vacina.nome, descricao_dose, num_dose, data_nasc
    FROM Paciente_Vacinado
    INNER JOIN Dose ON Paciente_Vacinado.fk_dose_id=Dose.dose_id and fk_paciente_id=?
    INNER JOIN Paciente ON paciente_id=? and fk_paciente_id=?
    INNER JOIN Vacina on Paciente_Vacinado.fk_vacina_id = Vacina.vacina_id

SELECT idade, Vacina.nome 
    FROM Paciente_Vacinado 
    INNER JOIN Paciente ON Paciente_Vacinado.fk_paciente_id=Paciente.paciente_id 
    INNER JOIN Vacina ON Vacina.vacina_id=Paciente_Vacinado.fk_vacina_id;

-- 1 consulta envolvendo uma das operações sobre conjuntos (união, diferença ou intersecção)
(SELECT 'Min' AS Tipo, fk_categoria_id, COUNT(fk_categoria_id) AS Quantidade FROM Paciente GROUP BY fk_categoria_id ORDER BY COUNT(fk_categoria_id) DESC LIMIT 1)
UNION
(SELECT 'Max' AS Tipo, fk_categoria_id, COUNT(fk_categoria_id) AS Quantidade FROM Paciente GROUP BY fk_categoria_id ORDER BY COUNT(fk_categoria_id) ASC LIMIT 1);

-- 3 consultas envolvendo funções de agregação
SELECT nome, CNPJ FROM Fabricante GROUP BY nome;

SELECT endereco_uf, COUNT(*) AS Quantidade FROM Paciente GROUP BY endereco_uf ORDER BY Quantidade DESC;

SELECT lote, COUNT(*) AS Quantidade FROM Vacina GROUP BY lote ORDER BY Quantidade DESC;

-- 1 consulta envolvendo subconsultas aninhadas

SELECT nome, count(*) FROM (
SELECT DISTINCT F.nome, D.descricao_dose FROM Dose D LEFT OUTER JOIN Paciente_Vacinado PV ON D.dose_id = PV.fk_dose_id LEFT OUTER JOIN Vacina V ON PV.fk_vacina_id = V.vacina_id LEFT OUTER JOIN Fabricante F ON V.fk_fabricante_id = F.fabricante_id) AS VacinasDoses GROUP BY nome