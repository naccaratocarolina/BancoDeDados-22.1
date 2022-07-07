import { Request, Response } from 'express';
import connect from "../db/connect";

// Consulta envolvendo a junção de apenas duas relações (INNER JOIN)
exports.findAllVaccineAndItsFab = async (req: Request, res: Response) => {
    const selection = "vacina_id, fk_fabricante_id, lote, Fabricante.nome, CNPJ";
    const condition = "Vacina.fk_fabricante_id = Fabricante.fabricante_id";
    const conn = await connect();
    conn.query(`SELECT DISTINCT ${selection} FROM Vacina INNER JOIN Fabricante ON ${condition} GROUP BY lote;`, (err, patients) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data: patients});
    });
    conn.end();
};

// Consulta envolvendo funções de agregação (COUNT, GROUP BY)
exports.countVaccineBatches = async (req: Request, res: Response) => {
    const conn = await connect();
    conn.query("SELECT lote, COUNT(lote) AS Quantidade FROM Vacina GROUP BY lote ORDER BY Quantidade DESC;", (err, data) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data: data});
    });
    conn.end();
};