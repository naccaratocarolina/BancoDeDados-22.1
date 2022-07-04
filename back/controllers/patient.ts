import { Request, Response } from "express";
import Patient from "../models/patient";
import { Get, Post, Route, Body, Tags, Controller } from 'tsoa';
import { PatientReturn } from "../controllers/handlers/patientTypes";
import { errorHandler } from "../middlewares/errorHandler";
import { Attributes } from "sequelize/types";

@Route("/patient")
@Tags("Paciente")
export class patientController extends Controller {
    constructor () {
        super();
    }

    private getPatientRawData (patient: Patient): PatientReturn {
        let patientRaw = <Attributes<Patient>> patient.get('', { plain: true });
        return {
            paciente_id: patient.paciente_id!,
            data_nasc: patient.data_nasc!,
            idade: patient.idade!,
            endereco_cep: patient.endereco_cep!,
            endereco_uf: patient.endereco_uf!,
            fk_categoria_id: patient.fk_categoria_id!
        };
        return patientRaw;
    };

    @Get()
    async getAllPatients (
    ): Promise<PatientReturn[]> {
        let ret: PatientReturn[] = [];
        const patients = <Patient[]> await Patient.findAll().catch((err: Error) => {
            throw new errorHandler('Patientdb',  err.toString());
        });

        patients.forEach((k) => {
            ret.push(this.getPatientRawData(k));
        });
        
        console.log(ret);
        return ret;
    };

    @Get("{patientId}")
    async getPatient (
        patientId: string
    ): Promise<PatientReturn> {
        let patient = <Patient|null> await Patient.findByPk(patientId).catch((err: Error) => {
            throw new errorHandler('Patientdb',  err.toString());
        });

        if (!patient) {
            throw new errorHandler('Patientdb', 'Paciente nao existe!');
        }

        return this.getPatientRawData(patient);
    }
};