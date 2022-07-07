import { Request, Response } from 'express';
import connect from "../db/connect";

// Consulta envolvendo funções de agregação (GROUP BY)
exports.findAll = async (req: Request, res: Response) => {
    const conn = await connect();
    conn.query("SELECT * FROM Fabricante GROUP BY nome;", (err, fabricators) => {
        if (err) {
            return res.json({success: false, error: err});
        }
        return res.json({success: true, data: fabricators});
    });
    conn.end();
};