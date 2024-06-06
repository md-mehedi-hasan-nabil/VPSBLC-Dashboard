import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

export default function LineChart({ data, colors }: {
    data: number[];
    colors: string[]
}) {
    const options: ApexOptions = {
        chart: {
            type: 'line',
            background: 'transparent',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        colors,
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"],
            labels: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        },
        tooltip: {
            enabled: false,
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    }

    const series = [
        {
            name: 'series1',
            data,
            stroke: {
                show: false
            }
        },
    ]

    return (
        <div className='md:mt-14 md:-mb-10 scale-y-75'>
            <ReactApexChart options={options} series={series} />
        </div>
    );
}
