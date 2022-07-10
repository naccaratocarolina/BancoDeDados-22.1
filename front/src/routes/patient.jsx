import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { ApiService } from '../services/ApiService';

const apiService = new ApiService();


export default function Patient() {
  const { patientId } = useParams();

  const [patientDetails, setpatientDetails] = useState(undefined);
  const [patientDoses, setpatientDoses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientDetails = await apiService.getPatientDetails(patientId);
      const patientDoses = await apiService.getPatientDoses(patientId);

      setpatientDetails(patientDetails);
      setpatientDoses(patientDoses);
    }

    fetchData();
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Detalhes:</h2>
      { patientDetails ? (
        <div style={{ padding: "1rem 2rem" }}>
          <p><b>ID:</b> {patientDetails.paciente_id}</p>
          <p><b>Idade:</b> {patientDetails.idade}</p>
          <p><b>Data de nascimento:</b> {patientDetails.data_nasc}</p>
          <p><b>CEP:</b> {patientDetails.endereco_cep}</p>
          <p><b>UF:</b> {patientDetails.endereco_uf}</p>
        </div>
        ): null
      }

      <h2>Doses:</h2>

      { patientDoses ?
        patientDoses.map((dose, idx) =>
          <div key={idx} style={{ padding: "1rem 2rem" }}>
            <p><b>Data de aplicação:</b> {dose.data_aplicacao}</p>
            <p><b>Descrição:</b> {dose.descricao_dose}</p>
            <p><b>Número:</b> {dose.num_dose}</p>
          </div>
        ) : null
      }
    </main>
  )
}