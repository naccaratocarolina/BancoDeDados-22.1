import { useState, useEffect } from 'react';
import { PatientCategoriesView } from '../components/patient/PatientCategoriesView';
import { PatientList } from '../components/patient/PatientList';
import { PatientPerCountryStatesView } from '../components/patient/PatientPerCountryStatesView';

import './patient.css';

import { ApiService } from '../services/ApiService';

const apiService = new ApiService();

export function Patients() {
  const [patientIds, setPatientIds] = useState([]);
  const [patientCategories, setPatientCategories] = useState(undefined);
  const [patientCountryStates, setPatientCountryStates] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const patientIds = await apiService.getPatients();
      const patientCategories = await apiService.getPatientCategories();
      const patientCountryStates = await apiService.getPatientCountryStates();

      setPatientIds(patientIds);
      setPatientCategories(patientCategories);
      setPatientCountryStates(patientCountryStates);
    }

    fetchData();
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h1 id="paciente-titulo">Lista de Pacientes</h1>
      <div id="graficos">
        <div><PatientCategoriesView categories={patientCategories} /></div>
        <div><PatientPerCountryStatesView countryStates={patientCountryStates} /></div>
      </div>
      <PatientList patientIds={patientIds} />
    </main>
  );
}