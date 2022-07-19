import { Request, Response } from 'express';
import connect from "../db/connect";

// Consulta envolvendo funções de agregação (GROUP BY)
exports.findAll = async (req: Request, res: Response) => {
    const conn = await connect();
    conn.query("SELECT * FROM Fabricante GROUP BY nome;", (err, fabricators) => {
        if (err) {
            return res.json({success: false, error: err});
        }

        fabricators.map((f: any) => f.logo = f.logo.toString('base64'));
        return res.json({success: true, data: fabricators});
    });
    conn.end();
};

// Consulta envolvendo subconsultas aninhadas
exports.countDosesByFabricator = async (req: Request, res: Response) => {
    const first_selection = "nome, COUNT(*) AS Quantidade";
    const second_selection = "F.nome, D.descricao_dose";
    const first_condition = "D.dose_id = PV.fk_dose_id";
    const second_condition = "PV.fk_vacina_id = V.vacina_id";
    const third_condition = "V.fk_fabricante_id = F.fabricante_id";

    const conn = await connect();
    conn.query(`SELECT ${first_selection} FROM (SELECT DISTINCT ${second_selection} FROM Dose D LEFT JOIN Paciente_Vacinado PV ON ${first_condition} LEFT JOIN Vacina V ON ${second_condition} LEFT JOIN Fabricante F ON ${third_condition}) AS VacinasDoses GROUP BY nome;`, (err, fabs) => {
        if (err) {
            return res.json({success: false, error: err});
        }

        return res.json({success: true, data: fabs});
    });
    conn.end();
};