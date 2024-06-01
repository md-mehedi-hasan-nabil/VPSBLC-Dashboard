import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

export default function AreaChart() {
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
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
    }

    const series = [
        {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 90, 10],
            stroke: {
                show: false 
            }
        },
    ]

    return (
        <div className='md:absolute md:scale-y-75 left-0 right-0 -bottom-16 w-full -z-10'>
            <ReactApexChart options={options} series={series} />
        </div>
    );
}
