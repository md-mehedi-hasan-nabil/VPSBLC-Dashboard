import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const ApexChart = () => {
  const [series] = useState([
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
  ]);

  const [options] = useState<ApexOptions>({
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  });

  return (
    <>
      <div className="mt-2 overflow-hidden">
        <h2 className="mt-8 text-3xl text-[#343C6A] font-semibold">GROWTH ANALYICS</h2>
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
    </>


  );
};

export default ApexChart;
