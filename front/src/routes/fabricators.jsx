import { useState, useEffect } from 'react';
import { DosesPerFabricatorView } from '../components/fabricator/DosesPerFabricatorView';
import { FabricatorsTableView } from '../components/fabricator/FabricatorsTableView';

import { ApiService } from '../services/ApiService';

const apiService = new ApiService();

export function Fabricators() {
  const [dosesPerFabricator, setDosesPerFabricator] = useState(undefined);
  const [fabricators, setFabricators] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const dosesPerFabricator = await apiService.getDosesPerFabricator();
      const fabricators = await apiService.getFabricators();

      setDosesPerFabricator(dosesPerFabricator);
      setFabricators(fabricators);
    }

    fetchData();
  }, []);

  return (
    <div>
      <DosesPerFabricatorView dosesPerFabricator={dosesPerFabricator} />
      <FabricatorsTableView fabricators={fabricators} />
    </div>
    )
  }