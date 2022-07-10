import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { ApiService } from '../services/ApiService';

const apiService = new ApiService();

export default function Patients() {
  const [patientIds, setPatientIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const patientIds = await apiService.getPatients();
      setPatientIds(patientIds);
    }

    fetchData();
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Pacientes</h2>

      <ul>
        { patientIds ? 
         patientIds.map((patientId, idx) => 
          <li key={idx}> 
            <Link to={`/patient/${patientId}`}>{patientId}</Link>
          </li>
        ) : null }
      </ul>

    </main>
  );
}