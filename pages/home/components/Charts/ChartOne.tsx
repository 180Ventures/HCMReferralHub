import { ThreeDots } from '@/icons';
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: 'pie',
  },
  colors: ['#EE8062', '#01ADC7', '#7785DE'],
  labels: ['Deals Won', 'Deals Lost'],
  legend: {
    show: true,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartOne: React.FC = () => {
  const [state, setState] = useState<ChartThreeState>({
    series: [45, 35, 20],
  });

  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white p-8 pb-5 shadow-default xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h2 className="text-2xl font-Inter font-semibold text-blackLight">
            Closing Ratios
          </h2>
          <h5 className="text-sm font-Inter font-normal text-blackLight">
            March 2020
          </h5>
        </div>
        <div>
          <span className='cursor-pointer'>
            <ThreeDots />
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="pie"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
