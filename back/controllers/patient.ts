import { Request, Response } from "express";
const Patient = require("../models/patient");
import { Get, Post, Route, Body, Tags, Controller } from 'tsoa';
import { PatientReturn, PatientCheck } from "../controllers/handlers/patientTypes";
import { errorHandler } from "../middlewares/errorHandler";
import connect from "../db/connect";

@Route("/patient")
@Tags("Paciente")
export class patientController extends Controller {
    constructor () {
        super();
    }

    private getPatientRawData (patient: typeof Patient): PatientReturn {
        return {
            paciente_id: patient.paciente_id!,
            data_nasc: patient.data_nasc!,
            idade: patient.idade!,
            endereco_cep: patient.endereco_cep!,
            endereco_uf: patient.endereco_uf!,
            fk_categoria_id: patient.fk_categoria_id!
        };
    };

    @Get()
    async getAllPatients (
    ) {
        let ret: PatientReturn[] = [];
        const conn = await connect();
        conn.query("SELECT * FROM Paciente", (err: Error, data: PatientReturn[]) => {
            if (err) {
                throw new errorHandler('Pacientedb', err.toString());
            }

            data.forEach((k) => {
                console.log(k.paciente_id);
            })
        });
        return ret;
    };
};