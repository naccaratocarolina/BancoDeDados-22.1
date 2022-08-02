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
    <main style={{ padding: "1rem 0" }}>
      <h1>Fabricantes</h1>
      <div>
        <div id="titulos">
          <div><h2>Número de doses diferentes para cada fabricante</h2></div>
        </div>
        <div id="graficos">
          <div>
            <DosesPerFabricatorView dosesPerFabricator={dosesPerFabricator} />
          </div>
        </div>
        
      </div>
      <FabricatorsTableView fabricators={fabricators} />
    </main>
    )
  }