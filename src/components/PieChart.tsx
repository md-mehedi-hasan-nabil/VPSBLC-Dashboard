import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function PieChart() {
    const total = 100;  // Assuming the total is 100 for a complete donut
    const cycleCompletion = 13;
    const remainder = total - cycleCompletion;

    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        colors: ['#4CAF50', '#F1F9F1'],
        labels: ['Remaining', 'Cycle Completion'],
        dataLabels: {
            style: {
                colors: ['#ffffff']
            },
            enabled: false
        },
        tooltip: {
            theme: 'light',
            style: {
                fontSize: '12px',
                fontFamily: 'Poppins, sans-serif',
            },
            x: {
                show: true,
                format: 'dd MMM',
            },
            y: {
                formatter: function (val) {
                    return val + " models";
                }
            },
            marker: {
                show: false,
            },
        },
        legend: {
            show: false
        }
    };

    const series = [remainder, cycleCompletion];

    return (
        <div className='w-full'>
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    );
}
