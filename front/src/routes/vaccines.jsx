import { useState, useEffect } from 'react';
import { VaccinesPerBatchView } from '../components/vaccine/VaccinePerBatchView';
import { VaccinesPerAgeView } from '../components/vaccine/VaccinesPerAgeView';

import { ApiService } from '../services/ApiService';

const apiService = new ApiService();

export function Vaccines() {
  const [vaccinesPerBatch, setVaccinesPerBatch] = useState(undefined);
  const [vaccinesPerAge, setVaccinesPerAge] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const vaccinesPerBatch = await apiService.getVaccinesPerBatch();
      const vaccinesPerAge = await apiService.getVaccinesPerAge();

      setVaccinesPerBatch(vaccinesPerBatch);
      setVaccinesPerAge(vaccinesPerAge);
    }

    fetchData();
  }, []);

  return (
    <div>
      <VaccinesPerBatchView vaccinesPerBatch={vaccinesPerBatch} />
      <VaccinesPerAgeView vaccinesPerAge={vaccinesPerAge} />
    </div>
    )
  }