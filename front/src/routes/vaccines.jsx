import { useState, useEffect } from 'react';
import { BatchesTableView } from '../components/vaccine/BatchesTableView';
import { VaccinesPerBatchView } from '../components/vaccine/VaccinePerBatchView';
import { VaccinesPerAgeView } from '../components/vaccine/VaccinesPerAgeView';

import { ApiService } from '../services/ApiService';

import './style.css';

const apiService = new ApiService();

export function Vaccines() {
  const [vaccinesPerBatch, setVaccinesPerBatch] = useState(undefined);
  const [vaccinesPerAge, setVaccinesPerAge] = useState(undefined);
  const [batches, setBatches] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const vaccinesPerBatch = await apiService.getVaccinesPerBatch();
      const vaccinesPerAge = await apiService.getVaccinesPerAge();
      const batches = await apiService.getBatches();

      setVaccinesPerBatch(vaccinesPerBatch);
      setVaccinesPerAge(vaccinesPerAge);
      setBatches(batches);
    }

    fetchData();
  }, []);

  return (
    <main style={{ padding: "1rem 0" }}>
      <h1>Vacinas</h1>
      <div>
        <div id="titulos">
          <div><h2>Quantidade de vacinas por idade</h2></div>
          <div><h2>Quantidade de vacinas por lote</h2></div>
        </div>
        <div id="graficos">
          <div>
            <VaccinesPerAgeView vaccinesPerAge={vaccinesPerAge} />
          </div>
          <div>
            <VaccinesPerBatchView vaccinesPerBatch={vaccinesPerBatch} />
          </div>
      </div>
      </div>
      <BatchesTableView batches={batches} />
    </main>
    )
  }