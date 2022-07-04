import connect from "../db/connect";
import { PatientReturn } from "../controllers/handlers/patientTypes";
import { errorHandler } from "../middlewares/errorHandler";

class Patient {
    public paciente_id: string;
    public data_nasc: Date;
    public idade: number;
    public endereco_cep: string;
    public endereco_uf: string;
    public fk_categoria_id: number;

    constructor (patient: PatientReturn) {
        this.paciente_id = patient.paciente_id;
        this.data_nasc = patient.data_nasc;
        this.idade = patient.idade;
        this.endereco_cep = patient.endereco_cep;
        this.endereco_uf = patient.endereco_uf;
        this.fk_categoria_id = patient.fk_categoria_id;
        this.findAll = this.findAll.bind(this);
    }

    findAll = async (): Promise<PatientReturn[]> => {
        let ret: PatientReturn[] = [];
        const conn = await connect();
        conn.query("SELECT * FROM Paciente", (err: Error, data: PatientReturn[]) => {
            if (err) {
                throw new errorHandler('Pacientedb', err.toString());
            }
            console.log(data);
            ret = data;
        });
        return ret;
    };
}

export default Patient;