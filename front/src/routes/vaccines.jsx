import { useState, useEffect } from 'react';
import { BatchesTableView } from '../components/vaccine/BatchesTableView';
import { VaccinesPerBatchView } from '../components/vaccine/VaccinePerBatchView';
import { VaccinesPerAgeView } from '../components/vaccine/VaccinesPerAgeView';

import { ApiService } from '../services/ApiService';

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
    <div>
      <VaccinesPerBatchView vaccinesPerBatch={vaccinesPerBatch} />
      <VaccinesPerAgeView vaccinesPerAge={vaccinesPerAge} />
      <BatchesTableView batches={batches} />
    </div>
    )
  }