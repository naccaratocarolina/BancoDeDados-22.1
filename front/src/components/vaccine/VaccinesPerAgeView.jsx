import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { randomColors } from '../../utils'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
};

function arrFromRange(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function arrOfZeros(len) {
  return Array(len).fill(0)
}
  
export function VaccinesPerAgeView(props) {
  const { vaccinesPerAge } = props;
  if(!vaccinesPerAge) {
    return null;
  }
  
  const minAge = vaccinesPerAge.reduce((previousValue, currentValue) => previousValue.idade < currentValue.idade ? previousValue : currentValue, 100000).idade
  const maxAge = vaccinesPerAge.reduce((previousValue, currentValue) => previousValue.idade > currentValue.idade ? previousValue : currentValue, 0).idade
  
  const ages = arrFromRange(minAge, maxAge);
  const labels = ages.map(age => age.toString());
  
  const agesPerVaccine = new Map();

  vaccinesPerAge.forEach(v => {
    if(!agesPerVaccine.has(v.nome)) {
      agesPerVaccine.set(v.nome, arrOfZeros(ages.length))
    }

    agesPerVaccine.get(v.nome)[v.idade - minAge]++;
  });

  const [bgColors, borderColors] = randomColors(agesPerVaccine.size)

  const data = {
    labels,
    datasets: Array.from(agesPerVaccine.entries()).map(([vaccine, agesCount], idx) => {
      const dataset = {
        label: vaccine,
        data: agesCount,
        borderColor: borderColors[idx],
        backgroundColor: bgColors[idx],
        borderWidth: 2
      };

      return dataset;
    })
  };
  
  return (
    <div>
      <h2>Quantidade de vacinas por idade</h2>
      <Line options={options} data={data} />
    </div>
    )
  }
  