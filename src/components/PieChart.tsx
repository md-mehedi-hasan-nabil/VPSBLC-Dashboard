import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function PieChart() {
    const options: ApexOptions = {
        chart: {
            type: 'donut',
            // height: 400
        },
        colors: ['#4CAF50', '#F1F9F1'],
        labels: ['Active models', 'Deactivated models'],
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

    const series = [13, 2];

    return (
        <div className='w-full'>
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    );
}
