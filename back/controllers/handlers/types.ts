interface PatientReturn {
    paciente_id: string,
    data_nasc: Date,
    idade: number,
    endereco_cep: string,
    endereco_uf: string,
    fk_categoria_id: number
};

export { PatientReturn }