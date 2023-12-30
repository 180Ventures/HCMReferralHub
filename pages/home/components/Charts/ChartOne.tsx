import { ThreeDots } from '@/icons';
import { ApexOptions } from 'apexcharts';
import React from 'react';
import dynamic from 'next/dynamic';
import moment from 'moment';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options: ApexOptions = {
  chart: {
    type: 'pie',
  },
  colors: ['#7785DE', '#00C3AB', '#EE8062'],
  labels: ['Deals Pending', 'Deals Won', 'Deals Lost'],
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
    style: {
      fontSize: '1rem'
    }
  },
  responsive: [
    // {
    //   breakpoint: 1024,
    //   options: {
    //     chart: {
    //       width: 220,
    //     },
    //   },
    // },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 300,
        },
      },
    },
  ],
};

interface IProps {
  //series: [1,1,1]
  series: number[];
}

const ChartOne = ({ series }: IProps) => {
  return (
    <div className="col-span-12 rounded-xl border border-stroke bg-white p-4 2xl:p-8 pb-2 2xl:pb-5 shadow-default xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h2 className="text-2xl font-Inter font-semibold text-blackLight">Closing Ratios</h2>
          <h5 className="text-sm font-Inter font-normal text-blackLight">{moment().format('MMMM YYYY')}</h5>
        </div>
        <div>
          <span className="cursor-pointer">
            <ThreeDots />
          </span>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto justify-center hidden 2xl:flex">
          {typeof window !== 'undefined' && <ReactApexChart width={340} options={options} series={series} type="pie" />}
        </div>
        <div id="chartThree" className="mx-auto justify-center flex 2xl:hidden">
          {typeof window !== 'undefined' && <ReactApexChart width={320} options={options} series={series} type="pie" />}
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
