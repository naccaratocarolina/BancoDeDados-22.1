import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  import { getLabelsAndDataFromArrOfObjects, randomColors } from '../../utils'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  
  export function DosesPerFabricatorView(props) {
    const { dosesPerFabricator } = props;
    if(!dosesPerFabricator) {
      return null;
    }
    
    const [labels, data] = getLabelsAndDataFromArrOfObjects(dosesPerFabricator, "nome", "Quantidade");
    
    const [bgColors, borderColors] = randomColors(labels.length);
    
    const chartData = {
      labels,
      datasets: [
        {
          label: '# de doses',
          data,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1
        }
      ],
    };
    
    return (
      <div id="fabricante-chart">
        <Bar options={options} data={chartData} />
      </div>
      )
    }
    