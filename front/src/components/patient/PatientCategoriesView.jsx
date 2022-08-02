import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { countArrObjectsByKey, getLabelsAndData, randomColors } from "../../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export function PatientCategoriesView(props) {
  const { categories } = props;
  if(!categories) {
    return null;
  }
  
  const categoriesCount = countArrObjectsByKey(categories, 'nome');
  const [labels, data] = getLabelsAndData(categoriesCount);

  const [bgColors, borderColors] = randomColors(labels.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: '# de pacientes',
        data,
        backgroundColor: bgColors,
        borderColor: borderColors,
        borderWidth: 1
      },
    ],
  };

  return (
      <div>
        <Doughnut width={"100%"} options={{ maintainAspectRatio: false }} data={chartData} />
      </div>
    )
  }